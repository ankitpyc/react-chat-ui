FROM node:18-alpine
# Set the working directory in the container
WORKDIR /rchatapp

# Copy package.json and package-lock.json to the container
COPY . /rchatapp

# Install dependencies
RUN npm install --force

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]