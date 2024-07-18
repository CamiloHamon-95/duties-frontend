FROM node:22-alpine AS BUILD_IMAGE2

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS PRODUCTION_IMAGE2

WORKDIR /app

COPY --from=BUILD_IMAGE2 /app/dist/ /app/dist/

EXPOSE 3000

COPY package*.json .

COPY vite.config.js .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "preview"]