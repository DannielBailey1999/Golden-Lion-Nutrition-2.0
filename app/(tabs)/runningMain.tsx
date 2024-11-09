import { Text, View, StyleSheet, Pressable, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import {MetricInput} from '@/src/types';
import { validateInput } from "@/src/components/validation";
import MapView, {Circle} from "react-native-maps";
import { router } from "expo-router";

export default function RunningMain () {
    //states:
    //1. for metric values
    const [metricValue, setMetricValue] = useState("1.0");
    //2. Toggling
    const [Toggle, setToggle] = useState('Distance');
    //3. Metric Unit 
    const [metricUnit, setMetricUnit] = useState('Miles');
    
    // keyboard visibility 
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

     // Helper function to make changes to the text input
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

    // Toggle Function
    const toggleHandler = () => {
        if (Toggle == 'Distance') {
            setToggle('Time');
            setMetricUnit('Hours : Minutes');
            setMetricValue('01:00');
        } else {
            setToggle('Distance');
            setMetricUnit('Kilometers');
            setMetricValue('1.0');
        }
    };

    return(
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
                                longitude: -122.4324
                            }}
                            radius={3}
                            fillColor="red" 
                        />
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
                            <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>{metricUnit}</Text>
                        </Pressable>
                    </View>
                    <View style={{justifyContent: "space-between", alignItems: 'center'}}>
                        <Avatar
                            size={120}
                            rounded
                            title="START"
                            onPress={() => router.push({
                                pathname: '/runningScreen',
                                params: {
                                    value: metricValue,      // This will be "1.0" for distance
                                    metric: Toggle,          // This will be "Distance" or "Time"
                                    type: Toggle,            // Same as metric
                                    unit: metricUnit        // This will be "Kilometers" or "Miles"
                                },
                            })}// Navigate to /app/running-session.tsx
                            activeOpacity={0.7}
                            titleStyle={{fontSize: 28, color: '#000', fontWeight: 'bold'}}
                            containerStyle={{backgroundColor: '#fe9836', marginBottom: 20}}
                        />
                        <Pressable 
                            onPress={toggleHandler}
                            style={{padding: 12, borderWidth: 2, borderRadius: 28, borderColor: '#ccc', elevation: 20}}
                        >
                            <Text style={{fontSize: 14, fontWeight: 'bold'}}>{Toggle}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

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
});