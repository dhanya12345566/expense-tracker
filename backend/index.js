import express from "express";
import https from "https"; // Import HTTPS module
import fs from 'fs'; // Import fs module for reading key and certificate files
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildContext } from "graphql-passport";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.config.js";
import job from "./cron.js";

dotenv.config();
configurePassport();

const __dirname = path.resolve();
const app = express();

// Read the key and certificate files
const key = fs.readFileSync('./localhost-key.pem');
const cert = fs.readFileSync('./localhost.pem');

// Create an HTTPS server
const httpsServer = https.createServer({ key, cert }, app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});

store.on("error", (err) => console.error("MongoDB session store error:", err));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
        },
        store: store,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: httpsServer })], // Use HTTPS server
});

// Await the server start
await server.start();

// Middleware setup for CORS and GraphQL endpoint
app.use(
    "/graphql",
    cors({
        origin: "https://localhost:3000", // Use HTTPS for frontend origin
        credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
    })
);

// Serve static files
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

// Connect to the database before starting the server
await connectDB();

// Start the server
await new Promise((resolve) => httpsServer.listen({ port: process.env.PORT || 4000 }, resolve));
console.log(`🚀 Server ready at https://localhost:${process.env.PORT || 4000}/graphql`);
