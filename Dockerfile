FROM node:18-buster-slim

WORKDIR /usr/app

RUN npm install -g pnpm -f
COPY package*.json  pnpm-lock.yaml /usr/app/


RUN apt-get update
RUN apt-get install -y openssl

RUN pnpm install
COPY . .

RUN pnpm dlx prisma generate && pnpm build 

EXPOSE 3000
CMD [ "node", "dist/src/main.js" ]