FROM node:18-alpine as builder

WORKDIR /app

COPY package.json npm-shrinkwrap.json ./
RUN npm install --production
RUN apk update && apk add bash
COPY . .
RUN npm run build

# --- Production Image ---

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["npm", "start"]