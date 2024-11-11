import { View, Text, Pressable, Keyboard, KeyboardAvoidingView, Platform, Image, StyleSheet, DimensionValue} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useRef, useEffect } from 'react';
import { levels } from '@/src/components/dummyData';
import ProgressBar from '@/src/components/progressBar';
import { useRunState } from '@/src/context/runContext';

export default function Summary() {
    const params = useLocalSearchParams();
    const { runState, updateRunState } = useRunState();
    const [title, setTitle] = useState(' ');
    const [imageBackground, setImageBackground] = useState('blue');
    const [kilometerLeft, setKilometerLeft] = useState(0);
    
    const getProgressValue = (progress: string): DimensionValue => {
        if (progress.endsWith('%')) {
            return progress as `${number}%`;
        }
        return 0;
    };

    const titleChangeHandler = (input: string): void => {
        setTitle(input);
    };

    const calculateLevelHandler = (totalKmRan: number): void => {
        for(let i = 0; i < levels.length; i++){
            if(levels[i].kilometerRequired > totalKmRan){
                setImageBackground(levels[i].level)
                let percentageDone = totalKmRan/levels[i].kilometerRequired;
                const progressString = `${Math.round(percentageDone * 100)}%`;
                updateRunState({ progress: progressString });
                setKilometerLeft(levels[i].kilometerRequired - totalKmRan);
                return;
            }
            setImageBackground(levels[i].level)
            let percentageDone = totalKmRan/levels[i].kilometerRequired;
            const progressString = `${Math.round(percentageDone * 100)}%`;
            updateRunState({ progress: progressString });
            setKilometerLeft(levels[i].kilometerRequired - totalKmRan);
        }
    };

    const parseParamAsNumber = (param: string | string[] | undefined, defaultValue = 0): number => {
        if (!param) return defaultValue;
        const value = Array.isArray(param) ? param[0] : param;
        return Number(value) || defaultValue;
    };

    useEffect(() => {
        const startTitle = params.day + ' ' + params.timeOfDay + ' Run';
        setTitle(startTitle);
        
        const totalKmRanNumber = parseParamAsNumber(params.totalKmRan);
        calculateLevelHandler(totalKmRanNumber);
        
        updateRunState({ totalKmRan: totalKmRanNumber.toString() });
    }, []);

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
            <Text style={styles.heading}>{params.day as string} - {params.timeOfDay as string}</Text>
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
                <View style={{marginTop: 12}}>
                    <Text style={styles.kilometerValue}>{(params.Kilometer as string) || "0.00"}</Text>
                    <Text style={styles.kilometerMetric}>Kilometers</Text>
                </View>
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
                        <Text style={styles.metricsValue}>
                            {params.calories ? Number(params.calories).toString() : "0"}
                        </Text>
                        <Text style={styles.metric}>Calories</Text>
                    </View>
                </View>
                <View style={styles.imageLogoContainer}>
                    <Image 
                        source={require('../assets/images/arkansas-pb_golden_lions_2015-pres_a.png')}
                        style={styles.image}
                    />
                    <Image 
                        source={require('../assets/images/arkansas-pb_golden_lions_2015-pres_a.png')}
                        style={styles.progressImage}
                    />
                    <ProgressBar 
                        prog={getProgressValue(runState.progress)}
                        innerBorderColor={imageBackground} 
                        containerborderColor={'#fff'} 
                        containerBgr={'#ccc'} 
                    />
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
        position: 'absolute',
        bottom: 190, 
        right: 0, 
        width: 20, 
        height: 25,
        left: 320, 
    }
});