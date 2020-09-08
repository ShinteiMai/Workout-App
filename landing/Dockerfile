FROM node:alpine

# 1. Set the working directory
WORKDIR /usr/app

# 2. Install PM2 globally
RUN npm install --global pm2

# 3. Copy package.json and package.lock.json before other files!
# Utilize docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# 4. Install dependencies
RUN npm install --production

# 5. Copy all files
COPY ./ ./

# 6. Build the application
RUN npm run build

# 7. Expose the listening port
EXPOSE 3000

# 8. Run the container as non-root
USER node

# 9. Launch app with PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]

