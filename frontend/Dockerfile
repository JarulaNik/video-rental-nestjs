FROM node:18-alpine as builder

WORKDIR /app

COPY package.json ./
RUN npm install --production

RUN apk update && apk add bash

COPY . .

# Создайте папку build
RUN mkdir /app/build

# Запустите сборку фронтенда
RUN npm run build

# --- Production Image ---

FROM nginx:latest

# Скопируйте папку build из образа builder
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]