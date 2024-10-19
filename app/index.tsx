import { Text, View, StyleSheet, FlatList, TextInput, Pressable, Button } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FoodListItem from "../src/components/foodListItem";
import { useState } from "react";



const foodItems = [
  {label: 'Pizza', cal: 75, brand: 'Dominos'},
  {label: 'Cake', cal: 75, brand: 'Case'},
  {label: 'Biscuit', cal: 75, brand: 'Kisko'}
]


export default function Index() {
  const [search, setSearch] = useState('');
  const performSearch = () => {
    console.warn('Searching for: ', search);

    setSearch('');
  }

  return (
    <View style={styles.container}>
      <TextInput value = {search} 
      onChangeText={setSearch} 
      placeholder="search..." 
      style={styles.input} />
      {search && <Button title="Search" onPress={performSearch} />}
      <FlatList
      data={foodItems}
      renderItem={({item}) => <FoodListItem item={item}/>}
      contentContainerStyle={{gap: 5}}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: '#fff',
      padding: 10, 
      gap: 5,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 10,
  }

});
