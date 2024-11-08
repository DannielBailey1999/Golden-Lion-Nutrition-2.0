// app/(tabs)/Summary.tsx
import { View, Text, Pressable, Keyboard, KeyboardAvoidingView, Platform, Image, StyleSheet, DimensionValue} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useRef, useEffect } from 'react';
import { levels } from '@/src/components/dummyData';
import ProgressBar from '@/src/components/progressBar';


export default function Summary() {
    //props from each run
    const params = useLocalSearchParams();
    console.log(params)
    const [title, setTitle] = useState(' ');
    const [progress, setProgress] = useState<DimensionValue>('80%');
    const [imageBackground, setImageBackground] = useState('blue');
    const [kilometerLeft, setKilometerLeft] = useState(0);
    
    const titleChangeHandler = (input: string): void => {
        setTitle(input);
    };

    const calculateLevelHandler = (totalKmRan: number): void => {
        let index;
        for(let i = 0; i < levels.length; i++){
            if(levels[i].kilometerRequired > totalKmRan){
                setImageBackground(levels[i].level)
                let percentageDone = totalKmRan/levels[i].kilometerRequired;
                const progressValue: DimensionValue = `${Math.round(percentageDone * 100)}%`;
                setProgress(progressValue);
                setKilometerLeft(levels[i].kilometerRequired - totalKmRan);
                return;
            }
            setImageBackground(levels[i].level)
            let percentageDone = totalKmRan/levels[i].kilometerRequired;
            const progressValue: DimensionValue = `${Math.round(percentageDone * 100)}%`;
            setProgress(progressValue);
            setKilometerLeft(levels[i].kilometerRequired - totalKmRan);
        }
    };

    // Convert string | string[] to number
    const parseParamAsNumber = (param: string | string[] | undefined, defaultValue = 0): number => {
        if (!param) return defaultValue;
        const value = Array.isArray(param) ? param[0] : param;
        return Number(value) || defaultValue;
    };

    // This hook works only once
    useEffect(() => {
        const startTitle = params.day + ' ' + params.timeOfDay + ' Run';
        setTitle(startTitle);
        
        // Convert totalKmRan to number before passing to handler
        const totalKmRanNumber = parseParamAsNumber(params.totalKmRan);
        calculateLevelHandler(totalKmRanNumber);
    }, []);

    // reference to TextInput component 
    const textInputRef = useRef<TextInput>(null);


    return (
        <Pressable style={styles.mainContainer}
             onPress={() => Keyboard.dismiss()}>
            <Stack.Screen options={{ 
                title: 'Summary', 
                headerStyle: {backgroundColor: '#f7f7f7'}, 
                headerRight: () => (
                    <Pressable onPress={() => alert('SHARE THIS RUN')}>
                        <Entypo name="share" size={24} color="black" />
                    </Pressable>
                ) 
            }} />
            {/* Day-Time */}
            <Text style={styles.heading}>{params.day as string} - {params.timeOfDay as string}</Text>
            {/*TextInput Heading with pencil icon*/}
            <Pressable style={styles.textInputContainer}
                 onPress={() => textInputRef.current?.focus()}>
                <TextInput value={title}
                 onChangeText={titleChangeHandler} 
                 style={styles.textInput}
                 ref={textInputRef}
                />
                <EvilIcons name="pencil" size={30} color="black" />
            </Pressable>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding': 'height'}
                style={{flex: 1}}>
                {/*Kilometers */}
                <View style={{marginTop: 12}}>
                    <Text style={styles.kilometerValue}>{(params.Kilometer as string) || "0.00"}</Text>
                    <Text style={styles.kilometerMetric}>Kilometers</Text>
                </View>
                {/*Metric pace, time and calories */}
                <View style={styles.metricsContainer}>
                    <View>
                        <Text style={styles.metricsValue}>{params.avgPace as string}</Text>
                        <Text style={styles.metric}>Pace</Text>
                    </View>
                    <View>
                        <Text style={styles.metricsValue}>{params.time as string}</Text>
                        <Text style={styles.metric}>Time</Text>
                    </View>
                    <View>
                        <Text style={styles.metricsValue}>{params.calories ? Number(params.calories).toString() : "0"}</Text>
                        <Text style={styles.metric}>Calories</Text>
                    </View>
                </View>
                {/*Logo and Progress Bar */}
                <View style={styles.imageLogoContainer}>
                    <Image 
                        source={require('../assets/images/arkansas-pb_golden_lions_2015-pres_a.png')}
                        style={styles.image}
                    />
                    <Image 
                        source={require('../assets/images/arkansas-pb_golden_lions_2015-pres_a.png')}
                        style={styles.progressImage}
                    />

                    <ProgressBar prog={progress} bgr={imageBackground} />
                    <Text style={{marginTop: 12}}>
                    {kilometerLeft} to orange level
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    mainContainer: {
        backgroundColor: "#fff", 
        flex: 1, 
        borderTopWidth: 1, 
        borderColor: '#ccc', 
        padding: 20,
    },
    heading: {
        fontSize: 16,
        color: '#aaaaaa'
    },
    textInput: {
        fontSize: 20, 
        fontWeight: 'bold'
    },
    kilometerValue: {
        fontSize: 80, 
        fontWeight: 'bold'
    },
    kilometerMetric: {
        fontSize: 16, 
        color: '#aaaaaa'
    },
    metricsContainer: {
        marginTop: 12, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    metricsValue: {
        fontSize: 24, 
        fontWeight: 'bold'
    },
    metric: {
        fontSize: 16, 
        color: '#999999'
    },
    imageLogoContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    image: {
        height: 170, 
        width: 180,
        marginBottom: 12
    },
    progressImage: {
        // position: 'absolute',
        bottom:5, 
        right: 0, 
        width: 20, 
        height: 25,
        left: 310
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