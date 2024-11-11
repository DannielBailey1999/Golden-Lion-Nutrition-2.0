import React, { createContext, useContext, useState } from 'react';
import { DimensionValue } from 'react-native';

export type RunState = {
  progress: string;
  metric: "Kilometers" | "Hours : Minutes";
  metricValue: string;
  pace: string;
  calories: string;
  timeValue: string;
  kilometersValue: string;
  targetValue: string;
  totalKmRan: string;
  inFocus: boolean;
};

type RunContextType = {
  runState: RunState;
  updateRunState: (newState: Partial<RunState>) => void;
};

const RunContext = createContext<RunContextType | undefined>(undefined);

export function RunProvider({ children }: { children: React.ReactNode }) {
  const [runState, setRunState] = useState<RunState>({
    progress: "12%",
    metric: "Kilometers",
    metricValue: "0.0",
    pace: "-'--\"",
    calories: "--",
    timeValue: "0",
    kilometersValue: "0",
    targetValue: "0",
    totalKmRan: "0",
    inFocus: true
  });

  const updateRunState = (newState: Partial<RunState>) => {
    setRunState(prev => ({ ...prev, ...newState }));
  };

  return (
    <RunContext.Provider value={{ runState, updateRunState }}>
      {children}
    </RunContext.Provider>
  );
}

export const useRunState = () => {
  const context = useContext(RunContext);
  if (context === undefined) {
    throw new Error('useRunState must be used within a RunProvider');
  }
  return context;
};