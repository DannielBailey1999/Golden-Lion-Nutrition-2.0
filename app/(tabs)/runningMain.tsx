import { Text, View, StyleSheet, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import {MetricInput} from '@/src/types';
import { validateInput } from "@/src/components/validation";
import MapView, {Circle} from "react-native-maps";
import { router } from "expo-router";
import * as Location from 'expo-location';


// Enhanced but keeping same basic structure
type LocationType = {
    latitude: number;
    longitude: number;
    accuracy: number | null;
    speed?: number | null;
    timestamp?: number;
};

export default function RunningMain() {
    // Keeping your existing states
    const [metricValue, setMetricValue] = useState("1.0");
    const [Toggle, setToggle] = useState('Distance');
    const [metricUnit, setMetricUnit] = useState('Miles');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    
    // Location states
    const [location, setLocation] = useState<LocationType | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [locationSubscription, setLocationSubscription] = useState<Location.LocationSubscription | null>(null);

    // Location setup - enhanced but keeping core functionality
    useEffect(() => {
        let isMounted = true;

        const startLocationTracking = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                // Enable high accuracy
                await Location.enableNetworkProviderAsync().catch(() => null);

                // Get initial location
                let initialLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.BestForNavigation
                });

                if (!isMounted) return;

                setLocation({
                    latitude: initialLocation.coords.latitude,
                    longitude: initialLocation.coords.longitude,
                    accuracy: initialLocation.coords.accuracy,
                    speed: initialLocation.coords.speed,
                    timestamp: initialLocation.timestamp
                });

                // Start watching location
                const subscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 1,
                    },
                    (newLocation) => {
                        if (!isMounted) return;
                        
                        setLocation({
                            latitude: newLocation.coords.latitude,
                            longitude: newLocation.coords.longitude,
                            accuracy: newLocation.coords.accuracy,
                            speed: newLocation.coords.speed,
                            timestamp: newLocation.timestamp
                        });
                    }
                );

                setLocationSubscription(subscription);
            } catch (err) {
                if (isMounted) {
                    setErrorMsg(err instanceof Error ? err.message : 'Error getting location');
                }
            }
        };

        startLocationTracking();

        return () => {
            isMounted = false;
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, []);

    // Keeping your existing handlers
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const changeMetricValueHandler = (input: string) => {
        if (validateInput(input, Toggle)) {
            if (input[0] == '.' || input[0] == ':') {
                input = '0' + input;
            }
            if (input[input.length - 1] == '.' || input[input.length - 1] == ':') {
                input = input + '0';
            }
            setMetricValue(input);
        }
    };

    const toggleHandler = () => {
        if (Toggle == 'Distance') {
            setToggle('Time');
            setMetricUnit('Hours : Minutes');
            setMetricValue('01:00');
        } else {
            setToggle('Distance');
            setMetricUnit('Miles');
            setMetricValue('1.0');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={10}
            style={styles.container}>

            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={{height: '100%', width: '100%'}}>
                    <View style={{height: '100%', width: '100%'}} pointerEvents="none">
                        <MapView 
                            style={styles.map} 
                            initialRegion={{
                                latitude: location?.latitude ?? 37.78825,
                                longitude: location?.longitude ?? -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            region={location ? {
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            } : undefined}
                            minZoomLevel={18}
                        >
                            {location && (
                                <Circle 
                                    center={{
                                        latitude: location.latitude,
                                        longitude: location.longitude
                                    }}
                                    radius={location.accuracy || 3}
                                    fillColor="rgba(255, 0, 0, 0.5)"
                                    strokeColor="rgba(255, 0, 0, 0.8)"
                                />
                            )}
                        </MapView>
                    </View>
                    
                    <View style={styles.container}>
                        <View>
                            <Pressable onPress={() => console.warn('Open Modal')}>
                                <View style={styles.inputWrapper}>
                                    <TextInput 
                                        style={{fontSize: 42, fontWeight: 'bold', alignSelf: 'center'}}
                                        keyboardType={Toggle === 'Distance' ? "decimal-pad" : "number-pad"}
                                        value={metricValue}
                                        onChangeText={changeMetricValueHandler}
                                        onFocus={() => setKeyboardVisible(true)}
                                    />
                                    {isKeyboardVisible && (
                                        <Pressable 
                                            onPress={dismissKeyboard}
                                            style={styles.dismissButton}
                                        >
                                            <Text style={styles.dismissButtonText}>Done</Text>
                                        </Pressable>
                                    )}
                                </View>
                                <View style={styles.metrics}></View>
                                <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>
                                    {metricUnit}
                                </Text>
                            </Pressable>
                        </View>
                        <View style={{justifyContent: "space-between", alignItems: 'center'}}>
                            <Avatar
                                size={120}
                                rounded
                                title="START"
                                onPress={() => {
                                    if (!location) {
                                        alert('Waiting for location...');
                                        return;
                                    }
                                    router.push({
                                        pathname: '/runningScreen',
                                        params: {
                                            value: metricValue,
                                            metric: Toggle,
                                            type: Toggle,
                                            unit: metricUnit,
                                            initialLatitude: location.latitude.toString(),
                                            initialLongitude: location.longitude.toString(),
                                            initialSpeed: location.speed?.toString() || '0',
                                            initialTimestamp: location.timestamp?.toString(),
                                        },
                                    });
                                }}
                                activeOpacity={0.7}
                                titleStyle={{fontSize: 28, color: '#000', fontWeight: 'bold'}}
                                containerStyle={{
                                    backgroundColor: location ? '#fe9836' : '#ccc',
                                    marginBottom: 20
                                }}
                            />
                            <Pressable 
                                onPress={toggleHandler}
                                style={{padding: 12, borderWidth: 2, borderRadius: 28, borderColor: '#ccc', elevation: 20}}
                            >
                                <Text style={{fontSize: 14, fontWeight: 'bold'}}>{Toggle}</Text>
                            </Pressable>
                        </View>
                        {errorMsg && (
                            <Text style={styles.errorText}>{errorMsg}</Text>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 38
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        marginBottom: 10
    },
    metrics: {
        borderBottomWidth: 2,
        marginBottom: 4
    },
    dismissButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        position: 'absolute',
        right: 0,
    },
    dismissButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    map: {
        width: '100%',
        height: '100%',
        opacity: 0.3,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 5,
    }
});