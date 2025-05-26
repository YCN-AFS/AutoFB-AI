# Base build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS production

WORKDIR /app
COPY --from=builder /app /app

EXPOSE 7000

CMD ["npm", "start"]


# FROM node:20-alpine AS base


# WORKDIR /app

# COPY package*.json ./

# RUN npm install --legacy-peer-deps

# COPY . .

# RUN GOOGLE_API_KEY=AIzaSyAxw2iKBa3IvXkELIIS6uIo2pzav1457XE npm run build

# EXPOSE 7000

# CMD ["npm", "start"]