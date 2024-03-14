# Use the official Node.js image as the base image
FROM node:19-alpine

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]

# Specify the port the application listens on
ENV PORT=3000
