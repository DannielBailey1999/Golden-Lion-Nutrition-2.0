// app/(tabs)/Summary.tsx
import { View, Text, Pressable, Keyboard, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Stack } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { TextInput } from 'react-native-gesture-handler';
import { useState, useRef } from 'react';
import { fonts } from 'react-native-elements/dist/config';

export default function Summary() {
    const [title, setTitle] = useState('Tuesday Morning Run');
    /// Function to change title
    const titleChangeHandler = (input: string): void => {
        setTitle(input);
    };

    // reference to TextInput component 
    const textInputRef = useRef<TextInput>(null);
  return (
    //Main container
    <Pressable style={{
        backgroundColor: "#fff", 
        flex: 1, 
        borderTopWidth: 1, 
        borderColor: '#ccc', 
        padding: 20,
         }}
         onPress={() => Keyboard.dismiss()}>
      <Stack.Screen options={{ title: 'Summary', headerStyle: {backgroundColor: '#f7f7f7'}, headerRight:()=>(
        <Pressable onPress={()=> alert('SHARE THIS RUN')}>
            <Entypo name="share" size={24} color="black" />
        </Pressable>) }} />
        {/* Day-Time */}
        <Text style={{fontSize: 16, color:'#aaaaaa'}}>Tuesday - 07:28</Text>
        {/*TextInput Heading with pencil icon*/}
        <Pressable style={{
            borderBottomWidth: 1,
             borderColor: '#ccc',
             paddingBottom: 10, 
             flexDirection: 'row', 
             justifyContent: 'space-between', 
             alignItems: 'center'
             }}
             onPress={() => textInputRef.current?.focus()}>
            <TextInput value={title}
             onChangeText={titleChangeHandler} 
             style={{fontSize: 20, fontWeight: 'bold'}}
             ref={textInputRef}
             />
             <EvilIcons name="pencil" size={30} color="black" />
        </Pressable>
        <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding': 'height'}
        style={{flex: 1, }}
        keyboardVerticalOffset={-100}
        >
            {/*Kilometers */}
        <View style={{marginTop: 12}}>
            <Text style={{fontSize: 80, fontWeight: 'bold'}}>2.22</Text>
            <Text style={{fontSize: 16, color:'#aaaaaa'}}>Kilometers</Text>
        </View>
        {/*Metric pace, time and calories */}
        <View style={{
            marginTop: 12, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center'}}>
            <View>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>10'59"</Text>
                <Text style={{fontSize: 16, color: '#999999'}}>Pace</Text>
            </View>
            <View>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>24:30</Text>
                <Text style={{fontSize: 16, color: '#999999'}}>Time</Text>
            </View>
            <View>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>116</Text>
                <Text style={{fontSize: 16, color: '#999999'}}>Calories</Text>
            </View>
        </View>
        {/*Logo and Progress Bar */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/images/arkansas-pb_golden_lions_2015-pres_a.png')}
            style={{height: 100, width: 120}}/>
            <Text>Progress Bar</Text>
        </View>
        </KeyboardAvoidingView>
    </Pressable>
  );
}