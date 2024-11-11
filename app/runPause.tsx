import React, { useEffect } from "react";
import { View, Text, StyleSheet, DimensionValue, TouchableOpacity, BackHandler } from "react-native";
import MapView, { Circle } from "react-native-maps";
import ProgressBar from "@/src/components/progressBar";
import { Avatar } from "react-native-elements";
import { router, useLocalSearchParams } from "expo-router";
import Toast from 'react-native-root-toast';
import { useRunState } from "@/src/context/runContext";

type SearchParams = {
  value?: string;
  metric?: string;
  type?: string;
  unit?: string;
  time?: string;
  kilometers?: string;
  calories?: string;
  pace?: string;
  progressPercentage?: string;
  targetValue?: string;
};

export default function PauseScreen() {
  const params = useLocalSearchParams<SearchParams>();
  const { runState } = useRunState();

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      router.replace('/(tabs)');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleStopPress = () => {
    // Get current date and time
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[now.getDay()];
    
    // Determine time of day
    const hour = now.getHours();
    let timeOfDay = "Morning";
    if (hour >= 12 && hour < 17) timeOfDay = "Afternoon";
    if (hour >= 17) timeOfDay = "Evening";

    // Format calories to ensure it's a valid number
    const formattedCalories = runState.calories === '--' ? '0' : runState.calories;

    Toast.show("Run stopped", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    router.push({
      pathname: "/Summary",
      params: {
        day: currentDay,
        timeOfDay: timeOfDay,
        Kilometer: runState.kilometersValue || "0",
        avgPace: runState.pace || "--",
        time: runState.timeValue || "00:00",
        calories: formattedCalories,  // Use formatted calories
        totalKmRan: runState.totalKmRan || "0",
      },
    });
  };

  const getProgressValue = (progress: string): DimensionValue => {
    if (progress.endsWith('%')) {
      return progress as `${number}%`;
    }
    return 0;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mapContainer} pointerEvents="none">
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          minZoomLevel={18}
        >
          <Circle
            center={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            radius={3}
            fillColor="red"
          />
        </MapView>
      </View>

      <View style={styles.metricMainContainer}>
        <View style={styles.metricInnerContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.metricValue}>
              {runState.kilometersValue || "0.00"}
            </Text>
            <Text style={styles.metric}>Kilometers</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <Text style={styles.metricValue}>
              {runState.calories === '--' ? '0' : runState.calories}
            </Text>
            <Text style={styles.metric}>Calories</Text>
          </View>
        </View>
        <View style={styles.metricInnerContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.metricValue}>{runState.timeValue || "00:00"}</Text>
            <Text style={styles.metric}>Time</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <Text style={styles.metricValue}>{runState.pace || "--"}</Text>
            <Text style={styles.metric}>Pace</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <ProgressBar
          prog={getProgressValue(runState.progress)}
          innerBorderColor={"black"}
          containerborderColor={"#ccc"}
          containerBgr={"#fff"}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleStopPress}>
          <Avatar
            size={120}
            rounded
            icon={{ name: "stop" }}
            activeOpacity={0.7}
            titleStyle={{ fontSize: 80, color: "white", fontWeight: "bold" }}
            containerStyle={{ backgroundColor: "#000" }}
          />
        </TouchableOpacity>
        <Avatar
          size={120}
          rounded
          icon={{ name: "play" }}
          activeOpacity={0.7}
          titleStyle={{ fontSize: 80, color: "white", fontWeight: "bold" }}
          containerStyle={{ backgroundColor: "#fe9836", marginLeft: 60 }}
          onPress={() => {
            router.back();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        opacity: 0.6,
    },
    mainContainer: {
        flex: 1
    },
    mapContainer: {
        height: '30%', 
        width: '100%'
    },
    metricMainContainer: {
        padding: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    metricInnerContainer: {
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    metricValue: {
        fontSize: 32, 
        fontWeight: 'bold'
    },
    metric: {
        color: '#999999'
    },
    progressBarContainer: {
        padding: 40, 
        alignItems: 'center'
    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row'
    }
});