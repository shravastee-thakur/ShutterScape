FROM node:22-slim

# Install required build tools for native modules like bcrypt
RUN apt-get update && apt-get install -y \
    python3 \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy only package files first (for layer caching)
COPY package*.json .

# omit dev dependancies and ci is continuous integration
RUN npm ci --omit=dev  

# Copy rest of backend code
COPY . .

ENV NODE_ENV=production

# Expose the port (container-level)
EXPOSE 8000

CMD ["node", "index.js"]
