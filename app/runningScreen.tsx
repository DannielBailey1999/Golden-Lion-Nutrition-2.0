import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, DimensionValue, Alert } from "react-native";
import ProgressBar from "@/src/components/progressBar";
import { Avatar } from "react-native-elements";
import { router, useNavigation, useLocalSearchParams } from "expo-router";

type Params = {
  value: string;
  metric: string; // Will be "Distance" or "Time"
  type: string; // Will be "Distance" or "Time"
  unit: string; // Will be "Kilometers" or "Miles"
};

const RunningScreen = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams<Params>();

  const [progress, setProgress] = useState<string>("12%");
  const [metric, setMetric] = useState<string>("Kilometers");
  const [metricValue, setMetricValue] = useState<string>("0.0");
  const [pace, setPace] = useState<string>("-'--\"");
  const [calories, setCalories] = useState<string>("--");
  const [timeValue, setTimeValue] = useState<string>("0");
  const [kilometersValue, setKilometersValue] = useState<string>("0");
  const [targetValue, setTargetValue] = useState<string>("0");

  console.log("Params:", {
    metric: params.metric, // Should show "Distance" or "Time"
    value: params.value, // Should show the actual value
  });

  useEffect(() => {
    // Set initial values based on params
    if (params.metric === "Time") {
      setMetric("Hours : Minutes");
      setMetricValue("00:00");
    } else {
      setMetric("Kilometers");
      setMetricValue("0.0"); // Default to 1.0 for distance
    }
    setTargetValue(params.value);
  }, [params]);

  useEffect(() => {
    // Start increment logic for time or distance
    if (params.type === "Time") {
      // Time increment logic (if needed)
    } else {
      // Distance increment logic (if needed)
    }
  }, [params.type]);

  // Format the display value based on type
  const getFormattedValue = () => {
    if (params.type === "Time") {
      return metricValue; // Already in HH:MM format
    } else {
      // Format distance to 2 decimal places
      return Number(metricValue).toFixed(2);
    }
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", (event) => {
      event.preventDefault();
      Alert.alert(
        "Discarding Run",
        "Are you sure you want to discard this run?",
        [
          { text: "No", style: "cancel", onPress: () => {} },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => navigation.dispatch(event.data.action),
          },
        ]
      );
    });
  }, [navigation]);

  return (
    <View style={styles.mainConatiner}>
      {/* Pace and Calories */}
      <View style={styles.paceCalContainer}>
        <View style={styles.metricContainer}>
          <Text style={styles.metricValue}>{pace}</Text>
          <Text style={styles.metric}>Pace</Text>
        </View>
        <View style={styles.metricContainer}>
          <Text style={styles.metricValue}>{calories}</Text>
          <Text style={styles.metric}>Calories</Text>
        </View>
      </View>

      {/* Distance/Time Metric set up */}
      <View style={styles.mainMetricContainer}>
        <Text style={styles.mainMetric}>{getFormattedValue()}</Text>
        <Text style={styles.metric}>{metric}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar
          prog={progress as DimensionValue}
          innerBorderColor={"black"}
          containerborderColor={"#fff"}
          containerBgr={"#ccc"}
        />
      </View>

      {/* Pause Button */}
      <View style={styles.buttonContainer}>
        <Avatar
          size={120}
          rounded
          icon={{ name: "pause" }}
          onPress={() =>
            router.push({
              pathname: "/runPause",
              params: {
                value: metricValue,
                metric: metric,
                type: params.type,
                unit: params.unit,
                time: timeValue,
                kilometers: kilometersValue,
                calories: calories,
                pace: pace,
                progressPercentage: progress || "0%",
                targetValue: targetValue,
              },
            })
          }
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