import { Text, View, StyleSheet, FlatList } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FoodListItem from "../src/components/foodListItem";

const foodItems = [
  {label: 'Pizza', cal: 75, brand: 'Dominos'},
  {label: 'Cake', cal: 75, brand: 'Case'},
  {label: 'Biscuit', cal: 75, brand: 'Kisko'}
]


export default function Index() {
  return (
    <View style={styles.container}>
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


});
