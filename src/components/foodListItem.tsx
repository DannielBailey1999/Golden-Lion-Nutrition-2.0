import { FoodListItemProps } from '../types';
import { Text, View, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { gql, useMutation} from '@apollo/client';
// This is the type you'll use for the FoodListItem component props

const mutation = gql`
mutation MyMutation($user_id: String!, $kcal: Int!, $food_id: String!, $label: String!) {
  insertFood_log(food_id: $food_id, kcal: $kcal, user_id: $user_id, label: $label) {
    created_at
    food_id
    id
    kcal
    label
    user_id
  }
}
`;

const FoodListItem: React.FC<FoodListItemProps> = ({ item }) => {
  const { food } = item;
  const [logFood, {data, loading, error}] = useMutation(mutation, {
    refetchQueries: ['myQuery']
  });
  const router = useRouter();

  const onPlusPressed = async () => {
    await logFood({
      variables: {
        food_id: item.food.foodId,
        kcal: item.food.nutrients.ENERC_KCAL,
        label: item.food.label,
        user_id: 'DANNIEL',
      },
    });
    router.back();
  };

  return (
    <View style={styles.container}>
    <View style={{flex: 1, gap: 5}}>
    <Text style={styles.foodLabel}>{item.food.label}</Text>
    <Text style={styles.fooddata}>{item.food.nutrients.ENERC_KCAL} cal, {item.food.brand}</Text>
    </View>
    <AntDesign onPress={onPlusPressed} name="pluscircleo" size={24} color="royalblue" />

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