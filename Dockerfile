FROM debian:bullseye-slim as dependencies

RUN apt update
RUN apt install curl unzip -y

RUN curl https://bun.sh/install | bash

FROM dependencies as builder

COPY src src
COPY package.json .
COPY bun.lockb .
COPY tsconfig.json .
COPY vite.config.ts .
COPY postcss.config.js .
COPY tailwind.config.js .

RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash - && \
  apt-get install -y nodejs \
  build-essential

RUN /root/.bun/bin/bun install --ignore-scripts

RUN /root/.bun/bin/bun run build:client
RUN /root/.bun/bin/bun run prisma generate

FROM dependencies as modules

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install --production --ignore-scripts

FROM gcr.io/distroless/base

WORKDIR /app

COPY prisma prisma
COPY src src
COPY tsconfig.json .

COPY --from=dependencies /root/.bun/bin/bun bun
COPY --from=modules node_modules node_modules
COPY --from=builder src/client src/client

ENV NODE_ENV production
CMD ["./bun", "src/server/app/index.ts"]

EXPOSE 3000
