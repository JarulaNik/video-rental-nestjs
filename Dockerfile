FROM node:18-alpine

WORKDIR /app

# Скопируйте package.json первым
COPY package*.json ./

# Скопируйте папку src
COPY src ./src
COPY tsconfig.json ./
COPY prisma ./prisma

RUN npm install

RUN npm install -g @nestjs/cli

EXPOSE 3000

# Запустите ваш бекенд-сервер.
CMD ["npm", "run", "start:dev"]