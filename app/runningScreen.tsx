import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, DimensionValue, Alert, BackHandler } from "react-native";
import ProgressBar from "@/src/components/progressBar";
import { Avatar } from "react-native-elements";
import { router, useNavigation, useLocalSearchParams } from "expo-router";
import { useRunState } from "@/src/context/runContext";

type Params = {
  value: string;
  metric: "Distance" | "Time";
  type: "Distance" | "Time";
  unit: "Kilometers" | "Miles";
};

const RunningScreen = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams<Params>();
  const { runState, updateRunState, updateLocation, addRoutePoint } = useRunState();

  // Handle back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Discarding run',
        'Are you sure you want to discard this run?',
        [
          {
            text: 'No',
            style: 'cancel',
            onPress: () => {}
          },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => {
              router.back();
            },
          },
        ]
      );
      return true; // Prevent default behavior
    });

    return () => backHandler.remove();
  }, []);

  // Helper function to convert progress string to DimensionValue
  const getProgressValue = (progress: string): DimensionValue => {
    if (progress.endsWith('%')) {
      return progress as `${number}%`;
    }
    return 0;
  };

  useEffect(() => {
    const focusUnsubscribe = navigation.addListener('focus', () => {
      updateRunState({ inFocus: true });
    });

    const blurUnsubscribe = navigation.addListener('blur', () => {
      updateRunState({ inFocus: false });
    });

    return () => {
      focusUnsubscribe();
      blurUnsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    if (!params) return;

    if (params.metric === "Time") {
      updateRunState({
        metric: "Hours : Minutes",
        metricValue: "00:00",
        targetValue: params.value
      });
    } else {
      updateRunState({
        metric: "Kilometers",
        metricValue: "0.0",
        targetValue: params.value
      });
    }
  }, [params?.metric, params?.value]);

  // New function to calculate distance
  const calculateDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371; // Earth's radius in kilometers
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    []
  );

  // New function to calculate pace
  const calculatePace = useCallback(
    (distanceKm: number, timeMs: number): string => {
      if (distanceKm <= 0) return "-'--\"";
      const timeMinutes = timeMs / (1000 * 60);
      const pace = timeMinutes / distanceKm;
      const paceMinutes = Math.floor(pace);
      const paceSeconds = Math.round((pace - paceMinutes) * 60);
      return `${paceMinutes}'${paceSeconds.toString().padStart(2, '0')}"`;
    },
    []
  );

  // New useEffect to handle location updates
  useEffect(() => {
    if (runState.routePoints.length > 0) {
      const lastPoint = runState.routePoints[runState.routePoints.length - 1];
      const newDistance = calculateDistance(
        lastPoint.latitude,
        lastPoint.longitude,
        runState.currentLocation?.latitude || 0,
        runState.currentLocation?.longitude || 0
      );

      updateRunState({
        kilometersValue: (
          parseFloat(runState.kilometersValue || '0') + newDistance
        ).toFixed(2),
        metricValue: (
          parseFloat(runState.kilometersValue || '0') + newDistance
        ).toFixed(2),
        pace: calculatePace(
          parseFloat(runState.kilometersValue || '0') + newDistance,
          runState.currentLocation?.timestamp
            ? runState.currentLocation.timestamp - runState.routePoints[0].timestamp
            : 0
        )
      });

      addRoutePoint({
        latitude: runState.currentLocation?.latitude || 0,
        longitude: runState.currentLocation?.longitude || 0,
        timestamp: runState.currentLocation?.timestamp || 0
      });
    }
  }, [runState.currentLocation, calculateDistance, calculatePace, updateRunState, addRoutePoint]);

  const handlePausePress = () => {
    router.push({
      pathname: "/runPause",
      params: {
        value: runState.metricValue,
        metric: runState.metric,
        type: params?.type,
        unit: params?.unit,
        time: runState.timeValue,
        kilometers: runState.kilometersValue,
        calories: runState.calories,
        pace: runState.pace,
        progressPercentage: runState.progress || "0%",
        targetValue: runState.targetValue,
      },
    });
  };

  return (
    <View style={styles.mainConatiner}>
      <View style={styles.paceCalContainer}>
        <View style={styles.metricContainer}>
          <Text style={styles.metricValue}>{runState.pace}</Text>
          <Text style={styles.metric}>Pace</Text>
        </View>
        <View style={styles.metricContainer}>
          <Text style={styles.metricValue}>{runState.calories}</Text>
          <Text style={styles.metric}>Calories</Text>
        </View>
      </View>

      <View style={styles.mainMetricContainer}>
        <Text style={styles.mainMetric}>
          {params?.type === "Time" ? runState.metricValue : Number(runState.metricValue).toFixed(2)}
        </Text>
        <Text style={styles.metric}>{runState.metric}</Text>
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar
          prog={getProgressValue(runState.progress)}
          innerBorderColor="black"
          containerborderColor="#fff"
          containerBgr="#ccc"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Avatar
          size={120}
          rounded
          icon={{ 
            name: "pause",
            type: "font-awesome",
            size: 50,
            color: "white"
          }}
          onPress={handlePausePress}
          activeOpacity={0.7}
          containerStyle={{ 
            backgroundColor: "#000", 
            marginBottom: 20,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    backgroundColor: '#fe9836',
    flex: 1, 
    paddingVertical: 24, 
    paddingHorizontal: 32, 
  },
  paceCalContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  metricContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 32
  },
  metric: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#a96528'
  },
  mainMetric: {
    fontSize: 100, 
    fontStyle: 'italic', 
    fontWeight: 'bold'
  },
  mainMetricContainer: {
    marginTop: 60, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  }
});

export default RunningScreen;