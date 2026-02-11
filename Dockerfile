FROM node:20-alpine

# Install tini for proper signal handling
RUN apk add --no-cache tini

# Create non-root user
RUN addgroup -S hyprfolio && adduser -S hyprfolio -G hyprfolio

WORKDIR /app

# Install dependencies (cached layer)
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source
COPY . .

# Setup entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Create config mount point and fix ownership
RUN mkdir -p /config && \
    chown -R hyprfolio:hyprfolio /app /config

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD wget -qO- http://localhost:8080/ || exit 1

ENTRYPOINT ["tini", "--"]
USER hyprfolio
CMD ["docker-entrypoint.sh"]
