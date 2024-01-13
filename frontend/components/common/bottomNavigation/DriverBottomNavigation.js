import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const DriverBottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarActiveTintColor: Colors.primary500, tabBarInactiveTintColor: "gray" }}></Tab.Navigator>
  );
};

export default DriverBottomNavigation;
