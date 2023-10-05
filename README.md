# Elysia with Bun runtime

This project is a Elysia + Solidjs App. The project is configured to use the [ESLint](https://eslint.org/) linter and [Prettier](https://prettier.io/) code formatter and follows the [StandardJS](https://standardjs.com/) code style.
The project is configured to use [Prisma](https://www.prisma.io/) as an ORM and [PostgreSQL](https://www.postgresql.org/) as a database.

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## Requirements

- [bun](https://bun.sh)
- [PostgreSQL](https://www.postgresql.org/)

## Recommendations

- Unix based OS (Linux Distribution, MacOS, [WSL](./docs/wsl.md))
- [VSCode](https://code.visualstudio.com/) >= v1.60.0

### [Setup Local DB](./docs/db.md)

## Conventions

### [StandardJS](./docs/standard-with-typescript.md)

### [Github Flow](./docs/github-flow.md)

## Get started

### Install dependencies

```sh
bun install
```

### Copy the .env.example file to .env

```sh
cp .env.example .env
```

### Replace the values in the .env file

### Migrate the database and run the seeds

```sh
npm run prisma migrate dev
```

### Run the server

```sh
npm run dev
```

### Happy coding!
