import { FoodItem } from "@/src/types";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

interface FoodListItemProps {
  item: FoodItem;
}

const FoodListItem: React.FC<FoodListItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
    <View style={{flex: 1, gap: 5}}>
    <Text style={styles.foodLabel}>{item.label}</Text>
    <Text style={styles.fooddata}>{item.cal} cal, {item.brand}</Text>
    </View>
    <AntDesign name="pluscircleo" size={24} color="royalblue" />

    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gainsboro', 
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
        fontSize: 16
    }
})

export default FoodListItem;