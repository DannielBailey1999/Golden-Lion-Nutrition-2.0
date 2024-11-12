import React, { createContext, useContext, useState } from 'react';
import { DimensionValue } from 'react-native';

// Add location types
type LocationData = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  speed: number | null;
  timestamp: number;
};

type RoutePoint = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

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
  // Add location-related fields
  currentLocation: LocationData | null;
  routePoints: RoutePoint[];
  isTracking: boolean;
};

type RunContextType = {
  runState: RunState;
  updateRunState: (newState: Partial<RunState>) => void;
  // Add convenience functions for location updates
  updateLocation: (location: LocationData) => void;
  addRoutePoint: (point: RoutePoint) => void;
  startTracking: () => void;
  stopTracking: () => void;
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
    inFocus: true,
    // Initialize new fields
    currentLocation: null,
    routePoints: [],
    isTracking: false
  });

  const updateRunState = (newState: Partial<RunState>) => {
    setRunState(prev => ({ ...prev, ...newState }));
  };

  // Add convenience functions
  const updateLocation = (location: LocationData) => {
    setRunState(prev => ({
      ...prev,
      currentLocation: location,
      routePoints: prev.isTracking 
        ? [...prev.routePoints, { 
            latitude: location.latitude, 
            longitude: location.longitude, 
            timestamp: location.timestamp 
          }]
        : prev.routePoints
    }));
  };

  const addRoutePoint = (point: RoutePoint) => {
    setRunState(prev => ({
      ...prev,
      routePoints: [...prev.routePoints, point]
    }));
  };

  const startTracking = () => {
    setRunState(prev => ({
      ...prev,
      isTracking: true,
      routePoints: [] // Reset route points when starting new tracking
    }));
  };

  const stopTracking = () => {
    setRunState(prev => ({
      ...prev,
      isTracking: false
    }));
  };

  return (
    <RunContext.Provider value={{ 
      runState, 
      updateRunState,
      updateLocation,
      addRoutePoint,
      startTracking,
      stopTracking
    }}>
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