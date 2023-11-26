import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export const graphqlClient = new ApolloClient({
  link: createHttpLink({
    uri: process.env.GITHUB_API_ENDPOINT,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`
    },
  }),
  cache: new InMemoryCache(),
});
