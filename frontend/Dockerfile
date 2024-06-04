# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальные файлы и устанавливаем права
COPY . .

# Установка прав для всех файлов в папке node_modules/.bin
RUN chmod +x node_modules/.bin/*

# Выполняем сборку
RUN npm run build

# Устанавливаем переменную окружения API_URL (для использования в React-приложении)
ENV API_URL=http://backend:3000

# Stage 2: Serve the app with nginx server
FROM nginx:alpine

# Копируем собранное React-приложение в публичную папку nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомную конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]