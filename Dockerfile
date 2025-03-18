# ===========================
# Stage 1: Build Stage
# ===========================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first to optimize caching
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code AFTER installing dependencies
COPY . .

# Build the frontend
RUN npm run build

# ===========================
# Stage 2: Production Stage
# ===========================
FROM node:18-alpine AS production

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Clean up unnecessary files
RUN yarn cache clean && rm -rf /app/node_modules/.cache

# Set correct ownership for security
RUN chown -R appuser:appgroup /app

# Expose port
EXPOSE 3000

# Use non-root user
USER appuser

# Start the application
CMD ["npm", "start"]
