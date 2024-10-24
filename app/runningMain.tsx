import { Text, View, StyleSheet, Pressable, TextInput} from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-elements";
import {MetricInput} from '@/src/types'

export default function RunningMain () {
    const [metricValue, setMetricValue] = useState("0.1");

    // Direct update of the value
    const handleTextChange = (text: string): void => {
        setMetricValue(text);
    };
    return(
        <View style={styles.container}>
            <Pressable onPress={() => console.warn('Open Modal')}>
            <TextInput style={{fontSize: 42, fontWeight: 'bold', alignSelf: 'center'}}
            keyboardType="decimal-pad"
            value={metricValue}
            onChangeText={handleTextChange}
            />
            <View style={styles.metrics}></View>
            <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>Kilometer</Text>
            </Pressable>
            <View style={{justifyContent: "space-between", alignItems: 'center'}}>
            <Avatar
            size="xlarge"
            rounded
            title="START"
            onPress={() => console.warn("Works!")
            }
            activeOpacity={0.7}
            titleStyle={{fontSize: 28, color: '#000', fontWeight: 'bold'}}
            containerStyle={{backgroundColor: '#fe9836', marginBottom: 20}}
            />
            <Pressable onPress={() => console.warn('Toggling')}
                style={{padding: 12, borderWidth: 2, borderRadius: 28, borderColor: '#ccc', elevation: 20}}
                >
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>Distance</Text>
            </Pressable>

            </View>
            
        </View>
    );
};

const styles= StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 38

    },
    metrics: {
        borderBottomWidth: 2,
        marginBottom: 4
    },
});




