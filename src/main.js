import { ApolloServer, gql } from "apollo-server";

// Schema definitions for the api service
const typeDefinitions = gql`
	type Query {
		greeting: String
	}
`;

const resolvers = {
	Query: {
		greeting: () => "Hello, world!",
	},
};

const server = new ApolloServer({
	typeDefs: typeDefinitions,
	resolvers: resolvers,
});
const { url } = await server.listen({ port: 9999 });
console.log(`listening on ${url}`);
