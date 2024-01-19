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
COPY --from=frontend-build /app/frontend/build ./pb_public

# Expose the port the app runs on
EXPOSE 8090

# Specify the command to run when the container starts
CMD [ "./pb/myapp", "serve", "--http", "0.0.0.0:8090" ]
