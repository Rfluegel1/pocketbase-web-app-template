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

# Build backend (Node.js)
FROM node:18.16.0-slim AS backend-build

WORKDIR /app/backend

# Install ca-certificates and update the certificate list
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates

# Copy backend package.json and package-lock.json for installing dependencies
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install --only=production

# Copy the rest of the backend code
COPY backend .

# Copy the built frontend
COPY --from=frontend-build /app/frontend/build ./pb/pb_public

# Set up Go build environment
FROM golang:1.21.3 AS go-build

WORKDIR /app

# Copy the Go code along with go.mod and go.sum
COPY backend/pb/go.mod backend/pb/go.sum /app/
COPY backend/pb /app/

# Disable CGO and build the Go application
RUN CGO_ENABLED=0 go build -o myapp /app

# Final stage: Create the final Docker image
FROM node:18.16.0-slim

WORKDIR /app/backend

# Copy the built Go binary from the Go build stage
COPY --from=go-build /app/myapp ./pb/myapp

# Copy the Node.js backend and the built frontend
COPY --from=backend-build /app/backend /app/backend

# Expose the port the app runs on
EXPOSE 8090

# Specify the command to run when the container starts
CMD [ "./pb/myapp", "serve", "--http", "0.0.0.0:8090" ]
