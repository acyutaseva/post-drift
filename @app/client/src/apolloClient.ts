import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.GRAPHQL_URI || 'http://localhost:4000/graphql';

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
