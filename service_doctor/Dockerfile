FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 6000

CMD ["npm", "start"]