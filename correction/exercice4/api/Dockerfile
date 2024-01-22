FROM node:22-bookworm-slim
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm i --omit=dev
COPY ./api/*.mjs ./src/
COPY ./api/.env ./src/
ENTRYPOINT ["node"]
CMD ["src/index.mjs"]
