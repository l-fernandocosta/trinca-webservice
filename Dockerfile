FROM node:18.16.0

WORKDIR /usr/app/

RUN npm install -g pnpm -f

COPY prisma ./prisma/
COPY package.json ./


RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 8084
ENTRYPOINT ["pnpm", "start:prod"]
