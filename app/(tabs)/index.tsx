import React, { useMemo } from 'react';
import { Text, View, FlatList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { FoodItem } from "@/src/types";
import FoodLogListItem from "@/src/components/foodLogListItem";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import CalorieCalculator from "@/src/components/CalorieCalculator";

// Define the type for the query response
interface FoodLogsQueryResponse {
  foodLogsForDate: Array<{
    food_id: string;
    user_id: string;
    created_at: string;
    label: string;
    kcal: number;
    id: string;
  }>;
}

const DAILY_CALORIE_GOAL = 2000;

const FOOD_LOGS_QUERY = gql`
  query FoodLogsForDate($date: Date!, $user_id: String!) {
    foodLogsForDate(date: $date, user_id: $user_id) {
      food_id
      user_id
      created_at
      label
      kcal
      id
    }
  }
`;

export default function HomeScreen() {
  const user_id = "DANNIEL";
  const { data, loading, error } = useQuery<FoodLogsQueryResponse>(FOOD_LOGS_QUERY, {
    variables: {
      date: dayjs().format('YYYY-MM-DD'),
      user_id,
    },
  });

  const consumedCalories = useMemo(() => {
    if (data?.foodLogsForDate) {
      return data.foodLogsForDate.reduce((total, item) => total + (item.kcal || 0), 0);
    }
    return 0;
  }, [data?.foodLogsForDate]);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch data</Text>;
  }

  // Convert the food log items to match the updated FoodItem structure
  const foodLogItems: FoodItem[] = data?.foodLogsForDate.map(item => ({
    __typename: "HintsEntry",
    food: {
      __typename: "Food1",
      brand: item.user_id, // Using user_id as brand since brand is required
      label: item.label,
      foodId: item.food_id,
      nutrients: {
        __typename: "Nutrients1",
        ENERC_KCAL: item.kcal
      }
    },
    kcal: item.kcal,
    label: item.label
  })) || [];
  console.log(foodLogItems);
  return (
    <View style={styles.container}>
      <CalorieCalculator dailyGoal={DAILY_CALORIE_GOAL} consumedCalories={consumedCalories} />
      <Link href="/runningMain" asChild>
      <Pressable>
            <Text style={{ color: 'blue' }}>Run Go For it</Text>
          </Pressable>
        </Link>
        <Link href="/MapView" asChild>
      <Pressable>
            <Text style={{ color: 'blue' }}>View Map</Text>
          </Pressable>
        </Link>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Today's Logged Food</Text>
        <Link href="/search" asChild>
          <Pressable>
            <Text style={{ color: 'blue' }}>Add Food</Text>
          </Pressable>
        </Link>
      </View>
      <View>
        <Link href= "/Activity"asChild>
        <Pressable>
          <Text>Live</Text>
        </Pressable>
        </Link>
        <Link href="/MapView" asChild>
          <Pressable>
            <Text style={{ color: 'blue' }}>Add Food</Text>
          </Pressable>
        </Link>
        
      </View>
      <FlatList
        data={foodLogItems}
        keyExtractor={(item) => item.food.foodId}
        renderItem={({ item }) => <FoodLogListItem item={item} />}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

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
    fontWeight: '500'
  },
});