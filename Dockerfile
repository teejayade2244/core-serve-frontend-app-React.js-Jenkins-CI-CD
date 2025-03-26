# ===========================
# Stage 1: Build Stage
# ===========================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first to optimize caching
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy source code AFTER installing dependencies
COPY . . 

# Build the frontend (creates /app/build)
RUN npm run build

# ===========================
# Stage 2: Production Stage
# ===========================
FROM node:18-alpine AS production

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Install serve (lightweight static file server for React)
RUN npm install --global serve

# Copy only necessary files from the builder stage
COPY --from=builder /app/build /app/build

# Set correct ownership for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app

# Expose port
EXPOSE 3000

# Use non-root user
USER appuser

# Serve the built React app
CMD ["serve", "-s", "build", "-l", "3000"]
