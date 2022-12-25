import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server-express";
import { readFile } from "fs/promises";
import { User } from "./db.js";
import resolvers from "./resolvers.js";

const PORT = 9000;
const JWT_SECRET = Buffer.from("Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt", "base64");

const app = express();
app.use(
	cors(),
	express.json(),
	expressjwt({
		algorithms: ["HS256"],
		credentialsRequired: false,
		secret: JWT_SECRET,
	})
);

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne((u) => u.email === email);
	if (user && user.password === password) {
		const token = jwt.sign({ sub: user.id }, JWT_SECRET);
		res.json({ token });
	} else {
		res.sendStatus(401);
	}
});

const context = async ({ req }) => {
	if (req.auth) {
		const user = await User.findById(req.auth.sub);
		return { user, auth: req.auth };
	}
	return {};
};
const typeDefs = await readFile("./schema.graphql", "utf-8");
const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: PORT }, () => {
	console.log(`🚀 Express server ready at http://localhost:${PORT}`);
	console.log(
		`🚀 Apollo server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
	);
});
