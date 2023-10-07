FROM debian:bookworm-slim as dependencies

RUN apt update
RUN apt install -y \
  libssl-dev libz-dev libpq-dev build-essential zlib1g libgcc-s1 libc6 \
  curl unzip openssl

RUN curl https://bun.sh/install | bash

FROM dependencies as builder

COPY prisma prisma
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
RUN /root/.bun/bin/bun run prisma generate

FROM dependencies as modules

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install --production --ignore-scripts

FROM gcr.io/distroless/base-debian12

WORKDIR /app

COPY --from=dependencies /root/.bun/bin/bun bun
COPY --from=modules node_modules node_modules
COPY --from=builder src/client src/client
COPY --from=builder node_modules/.prisma node_modules/.prisma
COPY --from=builder node_modules/@prisma node_modules/@prisma

COPY --from=dependencies /lib/x86_64-linux-gnu/libz.so.1 /lib/x86_64-linux-gnu/libz.so.1
COPY --from=dependencies /lib/x86_64-linux-gnu/libssl.so.3 /lib/x86_64-linux-gnu/libssl.so.3
COPY --from=dependencies /lib/x86_64-linux-gnu/libgcc_s.so.1 /lib/x86_64-linux-gnu/libgcc_s.so.1
COPY --from=dependencies /lib/x86_64-linux-gnu/librt.so.1 /lib/x86_64-linux-gnu/librt.so.1
COPY --from=dependencies /lib/x86_64-linux-gnu/libpthread.so.0 /lib/x86_64-linux-gnu/libpthread.so.0
COPY --from=dependencies /lib/x86_64-linux-gnu/libm.so.6 /lib/x86_64-linux-gnu/libm.so.6
COPY --from=dependencies /lib/x86_64-linux-gnu/libdl.so.2 /lib/x86_64-linux-gnu/libdl.so.2
COPY --from=dependencies /lib/x86_64-linux-gnu/libc.so.6 /lib/x86_64-linux-gnu/libc.so.6
COPY --from=dependencies /lib/x86_64-linux-gnu/libcrypto.so.3 /lib/x86_64-linux-gnu/libcrypto.so.3

COPY prisma prisma
COPY src src
COPY tsconfig.json .

ENV NODE_ENV production
CMD ["./bun", "src/server/app/index.ts"]

EXPOSE 3000
