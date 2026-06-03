# Single base image (node only) — one Docker Hub pull instead of node + nginx.
# For servers that cannot reach Docker Hub, use the GitHub Actions workflow
# to build on GHCR and deploy the pre-built image in Coolify.
FROM node:22-alpine AS build

WORKDIR /app

RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm config set fetch-retry-maxtimeout 120000

COPY package.json package-lock.json ./
RUN npm ci --no-audit

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm config set fetch-retry-maxtimeout 120000 \
  && npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
