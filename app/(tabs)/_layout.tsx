import { Tabs } from "expo-router"

export default () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,  // Hide headers for all tab screens
                tabBarStyle: {       // Optional: if you want the tab bar to still show
                    display: "flex"
                }
            }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="runningMain" />
        </Tabs>
    )
}