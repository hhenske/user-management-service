# Stage 1: Build
FROM node:14 as build

WORKDIR /app

# Copy package*.json before installing dependencies
COPY package*.json ./

# Install npm packages
RUN npm ci

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:14-alpine

WORKDIR /app

# Copy built application from the first stage
COPY --from=build /app .

# Install necessary MongoDB client for Node.js
RUN apk add --no-cache postgresql-client

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "dist/app.js"]
