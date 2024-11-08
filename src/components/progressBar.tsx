import React from "react";
import { View, Text, StyleSheet, DimensionValue } from "react-native";
import { useState } from "react";


type ProgressBarProps = {
    prog: DimensionValue;
    bgr: string;
};


const ProgressBar = ({ prog, bgr }: ProgressBarProps) => {
    const [progress, setProgress] = useState<DimensionValue>('80%');
    const [imageBackground, setImageBackground] = useState('blue');
    return (
        <View style={styles.progressBarContainer}>
            <View style={{...styles.progressBar, width: prog, borderColor: bgr}}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressImage: {
        position: 'absolute',
        bottom: 190, 
        right: 0, 
        width: 20, 
        height: 25,
        left: 320
    },
    progressBarContainer: {
        borderRadius: 4, 
        borderColor: '#fff',
        backgroundColor: '#ccc',
        width: '80%',
        borderWidth: 2, 
    },
    progressBar: {
        borderRadius: 4, 
        backgroundColor: '#ccc',
        borderWidth: 2, 
    }
});

export default ProgressBar;