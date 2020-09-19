import { makeSchema, queryType, objectType, mutationType } from "@nexus/schema";
import { nexusSchemaPrisma } from "nexus-plugin-prisma/schema";
import path from "path";

const Company = objectType({
  name: "Company",
  definition(t) {
    t.model.id();
    t.model.symbol();
    t.model.name();
    t.model.description();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.company({
      resolve: (_root, args, ctx) => {
        return ctx.prisma.company.findOne({ where: { id: args.where.id } });
      },
    });

    t.crud.companies({ pagination: true, filtering: true });

    // t.field("company", {
    //   type: Company,
    //   nullable: true,
    //   args: {
    //     id: idArg(),
    //   },
    //   resolve: (_root, { id }, ctx) => {
    //     return ctx.prisma.company.findOne({ where: { id: Number(id) } });
    //   },
    // });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneCompany();
  },
});

export const schema = makeSchema({
  types: { Query, Company, Mutation },
  // CRUD won't work without this option!!!
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), "schema.graphql"),
    typegen: path.join(process.cwd(), "nexus.ts"),
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});
