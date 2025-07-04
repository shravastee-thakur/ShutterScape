# Stage 1: Build React app
FROM node:22-slim AS builder

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve static files
FROM node:22-slim
WORKDIR /app
RUN npm install -g serve

# Copy ALL built files from builder (including index.html)
COPY --from=builder /app/dist /app

EXPOSE 5173
CMD ["serve", "-s", "/app", "-l", "5173"]