# Use an official Node.js 20 image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy frontend files and install dependencies
COPY frontend/package*.json frontend/
RUN npm install --prefix frontend

# Copy backend files and install dependencies
COPY backend/package*.json backend/
RUN npm install --prefix backend

# Expose port 3000 for the app and 9090 for Prometheus
EXPOSE 3000 9090

# Copy Prometheus config
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Run command to start the application
CMD ["npm", "start"]
