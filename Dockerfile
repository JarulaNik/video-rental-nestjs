FROM node:18-alpine

WORKDIR /app

# Скопируйте файлы package.json и package-lock.json
COPY package*.json ./

# Установка переменной окружения для увеличения лимита памяти
ENV NODE_OPTIONS="--max_old_space_size=2048"

# Установка зависимостей
RUN npm install

# Копируйте остальные файлы проекта
COPY . .
COPY .env .

# Открываем порт 3000
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start:dev"]
