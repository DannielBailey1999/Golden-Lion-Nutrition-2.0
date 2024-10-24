import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalorieCalculatorProps {
  dailyGoal: number;
  consumedCalories: number;
}

const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({ dailyGoal, consumedCalories }) => {
  const remainingCalories = dailyGoal - consumedCalories;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie Summary</Text>
      <View style={styles.row}>
        <Text>Daily Goal:</Text>
        <Text>{dailyGoal} kcal</Text>
      </View>
      <View style={styles.row}>
        <Text>Consumed:</Text>
        <Text>{consumedCalories} kcal</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.remainingText}>Remaining:</Text>
        <Text style={styles.remainingText}>{remainingCalories} kcal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  remainingText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default CalorieCalculator;