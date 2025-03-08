import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function usePersistedState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted state on mount
  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setState(JSON.parse(value));
        }
      } catch (error) {
        console.error(`Error loading persisted state for key ${key}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersistedState();
  }, [key]);

  // Save state when it changes
  const setPersistedState = (newValue: T) => {
    setState(newValue);
    AsyncStorage.setItem(key, JSON.stringify(newValue)).catch(error => {
      console.error(`Error saving persisted state for key ${key}:`, error);
    });
  };

  return [state, setPersistedState, isLoading] as const;
}

export default usePersistedState; 