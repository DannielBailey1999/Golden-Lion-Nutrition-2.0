import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FoodListItem from "../src/components/foodListItem";


export default function Index() {
  return (
    <View style={styles.container}>
      <FoodListItem item={{label: 'Pizza', cal: 75, brand: 'Dominos'}}/>
      <FoodListItem item={{label: 'Cake', cal: 75, brand: 'Case'}}/>
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
