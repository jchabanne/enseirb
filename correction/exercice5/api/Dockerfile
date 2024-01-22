FROM node:22-bookworm-slim
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm i --omit=dev
COPY ./api/*.mjs ./src/
ENTRYPOINT ["node"]
CMD ["--env-file", "src/.env", "src/index.mjs"]
