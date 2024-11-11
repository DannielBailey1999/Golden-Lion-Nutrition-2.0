import React from "react";
import { View, Text, StyleSheet, DimensionValue, TouchableOpacity } from "react-native";
import MapView, { Circle } from "react-native-maps";
import ProgressBar from "@/src/components/progressBar";
import { Avatar } from "react-native-elements";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import Toast from 'react-native-root-toast';

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

  // Convert string values to numbers where needed
  const kilometers = params.kilometers ? parseFloat(params.kilometers) : 0;
  const targetValue = params.targetValue ? parseFloat(params.targetValue) : 0;
  const time = params.time ?? "00:00";
  const progressPercentage = params.progressPercentage ?? "0%";

   const router = useRouter();

  const handleStopPress = () => {
    // Show toast message
    Toast.show("Run stopped", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    // Navigate to the 'runningMain' route and reset the stack
     // Navigate to the 'runningMain' route and reset the stack
     // Navigate to the 'Summary' screen with params
     router.navigate({
        pathname: "/Summary",
        params: {
          day: "aday",
          timeOfDay: "ajaja",
          Kilometer: "haha",
          avgPace: "12",
          time: "12:34",
          calories: "456",
          totalKmRan: "hahahha",
        },
      });
    };

  return (
    <View style={styles.mainContainer}>
      {/*Map View */}
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

      {/*Metrics */}
      <View style={styles.metricMainContainer}>
        {/*Kilometers and Calories*/}
        <View style={styles.metricInnerContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.metricValue}>{kilometers.toFixed(2)}</Text>
            <Text style={styles.metric}>Kilometers</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <Text style={styles.metricValue}>{params.calories ?? "--"}</Text>
            <Text style={styles.metric}>Calories</Text>
          </View>
        </View>
        {/*Time and Pace */}
        <View style={styles.metricInnerContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.metricValue}>{time}</Text>
            <Text style={styles.metric}>Time</Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 16 }}>
            <Text style={styles.metricValue}>{params.pace ?? "--"}</Text>
            <Text style={styles.metric}>Pace</Text>
          </View>
        </View>
      </View>

      {/*Progress Bar*/}
      <View style={styles.progressBarContainer}>
        <ProgressBar
          prog={progressPercentage as DimensionValue}
          innerBorderColor={"black"}
          containerborderColor={"#ccc"}
          containerBgr={"#fff"}
        />
      </View>

      {/*Stop and Resume buttons*/}
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
          icon={{ name: "play" }} // Changed from 'resume' to 'play'
          activeOpacity={0.7}
          titleStyle={{ fontSize: 80, color: "white", fontWeight: "bold" }}
          containerStyle={{ backgroundColor: "#fe9836", marginLeft: 60 }}
          onPress={() => {
            router.back()
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