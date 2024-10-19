import { Text, View, StyleSheet, FlatList, TextInput, Pressable, Button, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FoodListItem from "../src/components/foodListItem";
import { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";


const query = gql`
query MyQuery($ingr: String = "") {
  search(ingr: $ingr) {
    text
    hints {
      food {
        brand
        label
        foodId
        nutrients {
          ENERC_KCAL
        }
      }
    }
  }
}
`;




export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [runSearch, {data, loading, error}]= useLazyQuery(query);

  const performSearch = () => {
    runSearch({variables: {ingr: search}});
    setSearch('');
  };

  if (error){
    return <Text>Faield to search</Text>
  }


  const items = data?.search?.hints || [];



  return (
    <View style={styles.container}>
      <TextInput value = {search} 
      onChangeText={setSearch} 
      placeholder="search..." 
      style={styles.input} />
      {search && <Button title="Search" onPress={performSearch} />}
      {loading && <ActivityIndicator />}
      <FlatList
      data={items}
      renderItem={({item}) => <FoodListItem item={item} />}
      ListEmptyComponent={() => <Text>Search a food</Text>}
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
