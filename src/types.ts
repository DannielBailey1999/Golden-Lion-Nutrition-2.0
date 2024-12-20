// This should be in your types.ts file

export interface HintsEntry {
  __typename: "HintsEntry";
  food: Food1;
}

interface Food1 {
  __typename: "Food1";
  brand: string;
  label: string;
  foodId: string;
  nutrients: Nutrients1;
}

interface Nutrients1 {
  __typename: "Nutrients1";
  ENERC_KCAL: number;
}

export interface FoodListItemProps {
  item: FoodItem;
}

// Updated FoodItem interface
export interface FoodItem extends HintsEntry {
  kcal: number;
  label: string;
}


export interface MetricInput {
  value: string;
  unit?: string;
}

export interface ActivityItem {
  id: string;
  day: string;
  timeOfDay?: string;
  Kilometer?: string;
  avgPace: string;
  time: string;
  calories: number;
  totalKmRan: string;
}


export interface ActivityCardProps {
  day: string;
  timeOfDay?: string;
  Kilometer?: string;
  avgPace: string;
  time: string;
  calories: number;
  totalKmRan: string;
}