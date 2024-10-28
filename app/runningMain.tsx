import { Text, View, StyleSheet, Pressable, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import {MetricInput} from '@/src/types';
import validateInput from "@/src/components/validation";
export default function RunningMain () {
    const [metricValue, setMetricValue] = useState("0.1");
    const [metricValueError, setMetricValueError] = useState(false);
    // keyboard visibility 
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    // helper function for validation
    
    // Direct update of the value
    const handleTextChange = (input: string): void => {
        // for distance
        // round off the number to one deceimal place
        if (validateInput(input)) {
            setMetricValue(input)
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return(
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View>
                    <Pressable onPress={() => console.warn('Open Modal')}>
                        <View style={styles.inputWrapper}>
                            <TextInput 
                                style={{fontSize: 42, fontWeight: 'bold', alignSelf: 'center'}}
                                keyboardType="decimal-pad"
                                value={metricValue}
                                onChangeText={handleTextChange}
                                onFocus={() => setKeyboardVisible(true)}
                                onBlur={() => setKeyboardVisible(false)}
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
                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>Kilometer</Text>
                    </Pressable>
                </View>
                <View style={{justifyContent: "space-between", alignItems: 'center'}}>
                    <Avatar
                        size="xlarge"
                        rounded
                        title="START"
                        onPress={() => console.warn("Works!")}
                        activeOpacity={0.7}
                        titleStyle={{fontSize: 28, color: '#000', fontWeight: 'bold'}}
                        containerStyle={{backgroundColor: '#fe9836', marginBottom: 20}}
                    />
                    <Pressable 
                        onPress={() => console.warn('Toggling')}
                        style={{padding: 12, borderWidth: 2, borderRadius: 28, borderColor: '#ccc', elevation: 20}}
                    >
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Distance</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
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
});