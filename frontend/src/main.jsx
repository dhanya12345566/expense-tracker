import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "C:/Users/USER/OneDrive/Desktop/redo/frontend/src/components/ui/GridbackGroun.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Create Apollo Client
// - Connects to the GraphQL server at the specified URI
// - Uses in-memory cache to store query results
// - "credentials: include" to send cookies for authentication
const client = new ApolloClient({
    uri: "https://localhost:4000/graphql",
    cache: new InMemoryCache(),
    credentials: "include",
});

// Render application
// - BrowserRouter for routing
// - Wrap App component with ApolloProvider to enable Apollo Client
// - Wrap with GridBackground component for UI styling
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <GridBackground>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </GridBackground>
        </BrowserRouter>
    </React.StrictMode>
);
