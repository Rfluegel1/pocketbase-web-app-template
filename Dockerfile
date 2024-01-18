# Build frontend
FROM node:18.16.0-slim AS frontend-build

WORKDIR /app/frontend

# Copy frontend package.json and package-lock.json for installing dependencies
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY frontend .

# Build the frontend
RUN npm run build

# Build backend
FROM node:18.16.0-slim AS backend-build

WORKDIR /app/backend

# Install ca-certificates and update the certificate list
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

# Copy backend package.json and package-lock.json for installing dependencies
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install --only=production

# Copy the rest of the backend code and the built frontend
COPY backend .
COPY --from=frontend-build /app/frontend/build ./pb/pb_public

# Set up Go environment
# Use a Docker multi-stage build to keep the final image size small
FROM golang:1.21.3 AS go-build

WORKDIR /app/backend

# Copy the backend Go code
COPY --from=backend-build /app/backend /app/backend

# Disable CGO and build the Go application
RUN CGO_ENABLED=0 go build -o ./pb/myapp ./pb

# Final stage: Create the final Docker image
FROM node:18.16.0-slim

WORKDIR /app/backend

# Copy the built Go binary from the previous stage
COPY --from=go-build /app/backend/pb/myapp ./pb/myapp

# Copy the rest of the backend code and the built frontend
COPY --from=backend-build /app/backend /app/backend
COPY --from=frontend-build /app/frontend/build ./pb/pb_public

# Expose the port the app runs on
EXPOSE 8090

# Specify the command to run when the container starts
CMD [ "./pb/myapp", "serve", "--http", "0.0.0.0:8090" ]
