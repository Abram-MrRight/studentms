# Use an official Node.js 20 image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy backend package.json and package-lock.json
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy all backend files
COPY backend/ ./

# Expose the desired port (e.g., 3000)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
