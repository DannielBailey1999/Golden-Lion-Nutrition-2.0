import { Text, View, FlatList, Pressable, StyleSheet} from "react-native";
import { Link } from "expo-router";
import { HintsEntry } from "@/src/types";
import FoodListItem from "@/src/components/foodListItem";


const foodItems: HintsEntry[] = [
    {
      __typename: "HintsEntry",
      food: {
        __typename: "Food1",
        label: 'Pizza',
        brand: 'Dominos',
        foodId: 'pizza001',
        nutrients: {
          __typename: "Nutrients1",
          ENERC_KCAL: 75
        }
      }
    },
    {
      __typename: "HintsEntry",
      food: {
        __typename: "Food1",
        label: 'Cake',
        brand: 'Case',
        foodId: 'cake001',
        nutrients: {
          __typename: "Nutrients1",
          ENERC_KCAL: 75
        }
      }
    },
    {
      __typename: "HintsEntry",
      food: {
        __typename: "Food1",
        label: 'Biscuit',
        brand: 'Kisko',
        foodId: 'biscuit001',
        nutrients: {
          __typename: "Nutrients1",
          ENERC_KCAL: 75
        }
      }
    }
  ];

export default function HomeScreen(){
    return(

        <View style={styles.container}>
            <View style={styles.headerRow}>
            <Text style={styles.subtitle}>Calories</Text>
            <Text>1770 - 360 = 1692</Text>
            </View>
    
            <View style={styles.headerRow}>
            <Text style={styles.subtitle}>Todays Logged Food</Text>
            <Pressable>
            <Link href="/search" asChild>
              <Text style={{ color: 'blue' }}>Add Food</Text>
            </Link>
            </Pressable>
        </View>
            
        <FlatList
      data={foodItems}
      renderItem={({item}) => <FoodListItem item={item} />}
      ListEmptyComponent={() => <Text>Search a food</Text>}
      contentContainerStyle={{gap: 5}}
      />
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        flex: 1, 
        padding: 10, 
        gap: 10
    },
    headerRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    subtitle: {
        fontSize: 16, 
        fontWeight: 500
    },
})