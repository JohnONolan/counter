import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import usePersistedState from './hooks/usePersistedState';

export default function Index() {
  const [count, setCount, isLoading] = usePersistedState('counter_value', 0);

  const incrementCounter = () => {
    setCount(count + 1);
  };

  const resetCounter = () => {
    setCount(0);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        gap: 50,
        paddingVertical: 70,
        paddingTop: 200,
        paddingHorizontal: 30,
      }}
    >
      <Text style={{ fontSize: 180, fontWeight: "bold" }}>{count}</Text>
      <Pressable
        onPress={incrementCounter}
        onLongPress={resetCounter}
        delayLongPress={800} // 0.8 second long press to trigger reset
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#A20109" : "#DD202B", // Darken when pressed
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
          width: "100%",
          alignItems: "center",
          marginHorizontal: 20,
          transform: [{ scale: pressed ? 0.98 : 1 }], // Subtle scale effect
        })}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "600" }}>
          Count
        </Text>
      </Pressable>
    </View>
  );
}
