import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// Define your HTTP and WebSocket endpoints
const httpUri = process.env.GRAPHQL_HTTP_URI || 'http://localhost:4000/graphql';
const wsUri = process.env.GRAPHQL_WS_URI || 'ws://localhost:4000/graphql';

// Create HTTP Link
const httpLink = new HttpLink({
  uri: httpUri,
});

// Create WebSocket Link
const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
  },
});

// Use split to direct queries and mutations to HTTP, and subscriptions to WebSocket
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// Create Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
