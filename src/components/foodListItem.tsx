import { FoodItem } from "@/src/types";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

interface FoodListItemProps {
  item: FoodItem;
}

const FoodListItem: React.FC<FoodListItemProps> = ({ item }) => {
  return (
    <View style=
    {{backgroundColor: 'gainsboro', 
    padding: 10, 
    borderRadius: 5, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    }}
    >
    <View style={{flex: 1, gap: 5}}>
    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.label}</Text>
    <Text style={{color: 'dimgray'}}>{item.cal} cal, {item.brand}</Text>
    </View>
    <AntDesign name="pluscircleo" size={24} color="royalblue" />

    </View>
    
  );
};

export default FoodListItem;