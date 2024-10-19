import { Text, View, FlatList, Pressable, StyleSheet, ActivityIndicator} from "react-native";
import { Link } from "expo-router";
import { HintsEntry } from "@/src/types";
import FoodLogListItem from "@/src/components/foodLogListItem";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
const query = gql`
query myQuery($date: Date!, $user_id: String!) {
  foodLogsForDate(date: $date, user_id: $user_id) {
    food_id
    user_id
    created_at
    label
    kcal
    id
  }
}`;


export default function HomeScreen(){
    const user_id = "DANNIEL";
    const {data, loading, error} = useQuery(query, {variables: {
        date: dayjs().format('YYYY-MM-DD'),
        user_id,
    },
});
if (loading){
    return <ActivityIndicator />
}
if (error) {
    return <Text>Failed to fetch data</Text>
}
console.log(data)
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
          data={data.foodLogsForDate}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => <FoodLogListItem item={item} />}
          contentContainerStyle={{ gap: 5 }}
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