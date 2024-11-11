import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Pressable } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client';
import HomeScreen from "./(tabs)";
import { RunProvider } from '@/src/context/runContext';



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
          <RunProvider>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
              <SafeAreaView style={{ flex: 1 }}>
                <RootSiblingParent>
                  <Stack
                    screenOptions={{
                      headerShown: true,
                      headerTitle: "",
                      headerBackTitle: "",
                      headerStyle: {
                        backgroundColor: '#fff',
                      },
                      contentStyle: {
                        paddingHorizontal: 12,
                      },
                    }}
                  >
                    <Stack.Screen 
                      name="(tabs)" 
                      options={{
                        headerShown: false
                      }}
                    />
                    <Stack.Screen 
                      name="Summary" 
                      options={{
                        headerShown: true,
                        headerTitle: "",
                        headerBackTitle: "",
                        headerLeft: () => (
                          <Pressable 
                            onPress={() => router.replace('/runningMain')}
                            style={({ pressed }) => ({
                              opacity: pressed ? 0.5 : 1,
                              paddingHorizontal: 10
                            })}
                          >
                            <Entypo name="chevron-left" size={24} color="black" />
                          </Pressable>
                        ),
                      }}
                    />
                    <Stack.Screen 
                      name="runPause" 
                      options={{
                        headerShown: true,
                        headerTitle: "",
                        headerBackTitle: "",
                        headerLeft: () => (
                          <Pressable 
                            onPress={() => router.replace('/(tabs)')}
                            style={({ pressed }) => ({
                              opacity: pressed ? 0.5 : 1,
                              paddingHorizontal: 10
                            })}
                          >
                            <Entypo name="chevron-left" size={24} color="black" />
                          </Pressable>
                        ),
                      }}
                    />
                  </Stack>
                </RootSiblingParent>
              </SafeAreaView>
            </View>
          </RunProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}