FROM node:20-alpine

# Install nginx and tini
RUN apk add --no-cache nginx tini

# Create non-root user
RUN addgroup -S hyprfolio && adduser -S hyprfolio -G hyprfolio

WORKDIR /app

# Install dependencies (cached layer)
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source
COPY . .

# Setup nginx config
COPY nginx.conf /etc/nginx/http.d/default.conf

# Setup entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Create config mount point and fix ownership
RUN mkdir -p /config && \
    chown -R hyprfolio:hyprfolio /app /config && \
    # nginx needs to write pid and logs
    mkdir -p /run/nginx && \
    chown -R hyprfolio:hyprfolio /run/nginx /var/lib/nginx /var/log/nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD wget -qO- http://localhost:8080/ || exit 1

ENTRYPOINT ["tini", "--"]
USER hyprfolio
CMD ["docker-entrypoint.sh"]
