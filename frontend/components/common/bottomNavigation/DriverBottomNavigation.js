import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DriverHomeScreen from "../../../screens/driverScreens/DriverHomeScreen";
const Tab = createBottomTabNavigator();
const DriverBottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: Colors.primary500, tabBarInactiveTintColor: "gray" }}>
      <Tab.Screen
        name="Home Screen"
        component={DriverHomeScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default DriverBottomNavigation;
