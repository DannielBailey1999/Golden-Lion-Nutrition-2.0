import { Text, View, StyleSheet, Pressable, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import {MetricInput} from '@/src/types';

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

    // helper function for validation
    const validateInput = (input: string, typeOfMetric: string)=> {
        if (input === '') return true; // Allow empty input
        
        var rgx;
        if(typeOfMetric === 'Distance') {
            rgx = /^[0-9]{0,2}\.?[0-9]{0,2}?$/;
        } else {
            // Time format HH:MM
            rgx = /^([0-9]{0,2}:?[0-9]{0,2})?$/;
        }
        return input.match(rgx);
    };

    // helper function to make changes to the text input 
    const handleTextChange = (input: string): void => {
        // Allow empty input
        if (input === '') {
            setMetricValue('');
            return;
        }

        // Validate and format input
        if (validateInput(input, Toggle)) {
            if (Toggle === 'Distance') {
                // Handle distance input
                if (input[0] === '.') {
                    input = '0' + input;
                }
                if (input[input.length - 1] === '.') {
                    input = input + '0';
                }
            } else {
                // Handle time input
                if (input.length === 1) {
                    if (!isNaN(Number(input)) && Number(input) <= 9) {
                        input = '0' + input + ':00';
                    }
                }
                if (input.length === 2 && !input.includes(':')) {
                    if (!isNaN(Number(input)) && Number(input) <= 23) {
                        input = input + ':00';
                    }
                }
                // Format time when : is entered
                if (input.includes(':') && input.length === 3) {
                    input = input + '00';
                }
            }
            setMetricValue(input);
        }
    };

    // Handle input blur (when focus is lost)
    const handleBlur = () => {
        setKeyboardVisible(false);
        
        // Format empty or incomplete input
        if (metricValue === '') {
            if (Toggle === 'Distance') {
                setMetricValue('0.0');
            } else {
                setMetricValue('00:00');
            }
        }
        // Ensure proper format for distance
        else if (Toggle === 'Distance' && !metricValue.includes('.')) {
            setMetricValue(metricValue + '.0');
        }
        // Ensure proper format for time
        else if (Toggle === 'Time' && !metricValue.includes(':')) {
            const numVal = parseInt(metricValue);
            if (!isNaN(numVal) && numVal < 24) {
                setMetricValue(metricValue.padStart(2, '0') + ':00');
            }
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        handleBlur();
    };

    const toggleHandler = () => {
        if(Toggle === 'Distance') {
            setToggle('Time');
            setMetricUnit('Hours : Minutes');
            setMetricValue('01:00');
        } else {
            setToggle('Distance');
            setMetricUnit('Miles');
            setMetricValue('1.0')
        };
    };

    return(
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View>
                    <Pressable onPress={() => console.warn('Open Modal')}>
                        <View style={styles.inputWrapper}>
                            <TextInput 
                                style={{fontSize: 42, fontWeight: 'bold', alignSelf: 'center'}}
                                keyboardType={Toggle === 'Distance' ? "decimal-pad" : "number-pad"}
                                value={metricValue}
                                onChangeText={handleTextChange}
                                onFocus={() => setKeyboardVisible(true)}
                                onBlur={handleBlur}
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
                        size="xlarge"
                        rounded
                        title="START"
                        onPress={() => console.warn("Works!")}
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