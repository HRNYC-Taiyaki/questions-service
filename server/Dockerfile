FROM node:14.15.1 as base

ENV NODE_ENV=production

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .
EXPOSE 3000

CMD ["node", "index.js"]
