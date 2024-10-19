import { FoodListItemProps } from '../types';
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

// This is the type you'll use for the FoodListItem component props

const FoodListItem: React.FC<FoodListItemProps> = ({ item }) => {
  const { food } = item;
  return (
    <View style={styles.container}>
    <View style={{flex: 1, gap: 5}}>
    <Text style={styles.foodLabel}>{item.food.label}</Text>
    <Text style={styles.fooddata}>{item.food.nutrients.ENERC_KCAL} cal, {item.food.brand}</Text>
    </View>
    <AntDesign name="pluscircleo" size={24} color="royalblue" />

    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f6f6f8', 
        padding: 10, 
        borderRadius: 5, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    foodLabel: {
        fontWeight: 'bold', 
        fontSize: 16,
    },
    fooddata: {
        fontWeight: 'bold', 
        fontSize: 16,
    }
})

export default FoodListItem;