import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client';
import HomeScreen from "./(tabs)";


const client = new ApolloClient({
  uri: 'https://zibyungon.us-east-a.ibm.stepzen.net/api/fun-poodle/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'apikey zibyungon::local.net+1000::8dd3656d4e00658e915eb0ce301cf155fbedae1c360910fa60ca86d0a361f18c',
  },
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Stack>
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false // Add this if you don't want to show the header for tabs
              }} 
            />
          </Stack>
        </ApolloProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}