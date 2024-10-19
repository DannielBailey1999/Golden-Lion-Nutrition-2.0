import { Text, View, StyleSheet} from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { ReactNode } from "react";

// Define the type for the item
// Define the type for the item
interface FoodItem {
    kcal: number;
    label: string;
    food: {
      label: string;
      nutrients: {
        ENERC_KCAL: number; // Calories in kilocalories
      };
      brand: string; // Add the brand field here
    };
  }


const FoodLogListItem = ({ item }: { item: FoodItem })=> {
  return (
    <View 
      style={styles.container}>
          <View style={{flex: 1, gap: 5}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {item.label}
            </Text>
          <Text style={{color: 'dimgray'}}>
            {item.kcal} cal </Text>
          </View>
        </View>
      
  );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gainsboro', 
        padding: 10, 
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

})

export default FoodLogListItem;