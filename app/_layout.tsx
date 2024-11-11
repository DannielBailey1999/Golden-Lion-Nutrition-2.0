import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
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
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <SafeAreaView style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    paddingHorizontal: 12  // Global horizontal padding for all screens
                  }
                }}
              >
                <Stack.Screen name="(tabs)" />
              </Stack>
            </SafeAreaView>
          </View>
        </ApolloProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}