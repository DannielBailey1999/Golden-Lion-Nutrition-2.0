import { Stack } from 'expo-router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://zibyungon.us-east-a.ibm.stepzen.net/api/altered-dragon/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'apikey zibyungon::local.net+1000::8dd3656d4e00658e915eb0ce301cf155fbedae1c360910fa60ca86d0a361f18c',
  },
});

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
};

export default RootLayout;