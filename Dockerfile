# Build stage — avoids Nixpacks (which downloads large nixpkgs tarballs from GitHub)
FROM node:22-alpine AS build

WORKDIR /app

# More resilient npm downloads on slow/unstable connections
RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm config set fetch-retry-maxtimeout 120000

COPY package.json package-lock.json ./
RUN npm ci --no-audit

COPY . .
RUN npm run build

# Production stage — serve static Vite output with nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
