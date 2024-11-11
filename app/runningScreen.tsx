import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, DimensionValue, Alert } from "react-native";
import ProgressBar from "@/src/components/progressBar";
import { Avatar } from "react-native-elements";
import { router, useNavigation, useLocalSearchParams } from "expo-router";
import { NavigationAction, EventMapBase } from '@react-navigation/native';
import type { EventListenerCallback } from '@react-navigation/native';
import { useRunState } from "@/src/context/runContext";

type Params = {
  value: string;
  metric: "Distance" | "Time";
  type: "Distance" | "Time";
  unit: "Kilometers" | "Miles";
};

interface BeforeRemoveEventMap extends EventMapBase {
  beforeRemove: {
    data: { action: NavigationAction };
    canPreventDefault: true;
  };
  [key: string]: {
    data?: unknown;
    canPreventDefault?: boolean;
  };
}

const RunningScreen = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams<Params>();
  const { runState, updateRunState } = useRunState();

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

  const backButtonCallback = useCallback<EventListenerCallback<BeforeRemoveEventMap, 'beforeRemove'>>(
    (event) => {
      event.preventDefault();
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
            onPress: () => navigation.dispatch(event.data.action),
          },
        ],
      );
    },
    [navigation],
  );

  useEffect(() => {
    let removeListener: (() => void) | undefined;
    
    if (runState.inFocus) {
      removeListener = navigation.addListener("beforeRemove", backButtonCallback);
    }

    return () => {
      if (removeListener) {
        removeListener();
      }
    };
  }, [navigation, runState.inFocus, backButtonCallback]);

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
          icon={{ name: "pause" }}
          onPress={handlePausePress}
          activeOpacity={0.7}
          titleStyle={{ fontSize: 80, color: "white", fontWeight: "bold" }}
          containerStyle={{ backgroundColor: "#000", marginBottom: 20 }}
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