# Use an official Node.js 20 image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy backend package.json and package-lock.json
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Install PM2 globally
RUN npm install pm2 -g

# Copy all backend files
COPY backend/ ./

# Expose the desired port (e.g., 3000)
EXPOSE 3000

# Start the server using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
