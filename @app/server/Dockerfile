# Build Stage
FROM node:20 AS build

WORKDIR /app

# Install server dependencies
COPY @app/server/package*.json ./
RUN npm install

# Copy server source code
COPY @app/server ./
RUN npm run build

# Build Stage for React client
FROM node:20 AS client-build

WORKDIR /client

# Install client dependencies
COPY @app/client/package*.json ./
RUN npm install

# Build client
COPY @app/client ./
RUN npm run build

# Final Stage
FROM node:20

WORKDIR /app

# Copy server build artifacts
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

# Copy client build artifacts
COPY --from=client-build /client/build /app/public

# Install production dependencies
COPY @app/server/package*.json ./
RUN npm install --only=production

EXPOSE 4000

CMD ["node", "dist/main.js"]
