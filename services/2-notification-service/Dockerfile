# ---------- Builder stage ----------
FROM node:24-alpine3.22 AS builder

ENV NODE_ENV=production

WORKDIR /app

# Copy dependency manifests first (better caching)
COPY package.json package-lock.json* ./
COPY .npmrc ./

# Copy source files
COPY tsconfig.json ./
COPY src ./src
COPY tools ./tools

# Deterministic dependency install & build application
RUN npm ci && npm run build


# ---------- Runtime stage ----------
FROM node:24-alpine3.22

ENV NODE_ENV=production

WORKDIR /app

# Runtime OS dependencies only
RUN apk add --no-cache curl

# Copy dependency manifests
COPY package.json package-lock.json* ./
COPY .npmrc ./

# Install production-only dependencies
RUN npm install -g pm2 && npm cache clean --force && npm ci --production

# Copy build artifacts
COPY --from=builder /app/build ./build

EXPOSE 4001

CMD ["npm", "run", "start"]

# Use pm2-runtime for production process management 
# CMD ["pm2-runtime", "build/src/app.js", "-i", "max"]