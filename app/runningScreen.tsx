// this is the screen where you start your run

import React from "react";
import { View, Text } from "react-native";

const RunningScreen = () => {
    return (
        <View
        style={{backgroundColor: '#fe9836',
            flex: 1, 
            paddingVertical: 24, 
            paddingHorizontal: 32, 
        }}>
            <View
            style={{
                justifyContent: 'space-between',
                 alignItems: 'center',
                 flexDirection: 'row'
                 }}>
                {/*Pace */}
                <View style={{
                    justifyContent: 'center',
                     alignItems: 'center',
                }}>
                    <Text style={{fontSize: 32}}>-'--"</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#a96528'}}>Pace</Text>
                </View>
                {/*Calories */}
                <View style={{
                    justifyContent: 'center',
                     alignItems: 'center', 
                }}>
                    <Text style={{fontSize: 32}}>-'--"</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#a96528'}}>Calories</Text>
                </View>
            </View>
            {/*Distance/ Time Metric set up */}
            <View
            style={{marginTop: 60, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 120, fontStyle: 'italic', fontWeight: 'bold'}}>0.00</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#a96528'}}>kilometers</Text>
            </View>
            {/*Progress Bar */}
            {/*Pause Button */}
        </View>
    );
};

export default RunningScreen;