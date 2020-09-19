# Best GraphQL Combo? Prisma + Nexus Schema

Here we combine Prisma with Nexus Schema to create a powerful, simple, and typed setup for defining our GraphQL schema and integrating it with our database via Prisma.

## Links

- Nexus Prisma Plugin: https://nexusjs.org/pluginss/prisma/overview
- Prisma Migrate: https://www.prisma.io/docs/reference/tools-and-interfaces/introspection

## Gotchas

- Don't install your own `@prisma/cli` and `@prisma/client` packages
- Don't forget to add **all** your types to your schema
- Don't forget the `--experimental` flag for Prisma migrations
- Don't forget the `experimentalCRUD` option to allow for crud operations

Order of Prisma commands:

- `yarn prisma init`
- `yarn prisma migrate save --experimental`
- `yarn prisma migrate up --experimental`
- `yarn generate`
