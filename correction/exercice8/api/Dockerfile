FROM node:22-bookworm-slim AS build
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm i --omit=dev

FROM node:22-bookworm-slim
WORKDIR /usr/app
COPY --from=build /usr/app/node_modules ./node_modules
COPY ./api/*.mjs ./src/
ENTRYPOINT ["node"]
CMD ["--env-file", "src/.env", "src/index.mjs"]
