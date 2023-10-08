FROM debian:bookworm-slim as dependencies

RUN apt update
RUN apt install -y \
  libssl-dev libz-dev libpq-dev build-essential zlib1g libgcc-s1 libc6 \
  curl unzip openssl

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
  apt install -y nodejs

RUN /root/.bun/bin/bun install --ignore-scripts

RUN /root/.bun/bin/bun run build:client

FROM dependencies as modules

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install --production --ignore-scripts

FROM gcr.io/distroless/base-debian12

WORKDIR /app

COPY --from=dependencies /root/.bun/bin/bun bun
COPY --from=modules node_modules node_modules
COPY --from=builder src/client src/client

COPY src src
COPY tsconfig.json .

ENV NODE_ENV production
CMD ["./bun", "src/server/app/index.ts"]

EXPOSE 3000
