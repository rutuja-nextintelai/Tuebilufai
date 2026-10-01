# ---------- Stage 1: build the Vite app ----------
# Vite 8 needs Node 20.19+ or 22.12+. Node 24 is the current LTS and matches local development.
FROM node:24-alpine AS builder
WORKDIR /app

# Install dependencies first so this layer stays cached until package*.json changes.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# The three form endpoints are baked into the bundle at build time (Vite only exposes VITE_* vars).
# Provide them either as build args (docker build --build-arg VITE_...=...) or in a .env.production
# file in the repo. A non-empty build arg wins over the file.
ARG VITE_GOOGLE_SCRIPT_URL
ARG VITE_CAREERS_SCRIPT_URL
ARG VITE_NEWSLETTER_SCRIPT_URL

COPY . .

# An empty build arg must not override a value from .env.production, so drop empty ones first.
RUN for v in VITE_GOOGLE_SCRIPT_URL VITE_CAREERS_SCRIPT_URL VITE_NEWSLETTER_SCRIPT_URL; do \
      eval "[ -n \"\$$v\" ] || unset $v"; \
    done && npm run build

# ---------- Stage 2: serve the static build with nginx ----------
FROM nginx:stable-alpine

# Cloud Run tells the container which port to listen on through $PORT (8080 by default).
# The nginx image's entrypoint substitutes it into the template below when the container starts.
ENV PORT=8080
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
