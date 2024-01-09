import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AdminHomeScreen from "../../../screens/adminScreens/AdminHomeScreen";
import EditProfile from "../../../screens/userScreens/EditProfile";
import ChatScreen from "../../../screens/common/ChatScreen";
import ReviewScreen from "../../../screens/adminScreens/ReviewScreen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/colors";
const Tab = createBottomTabNavigator();

const AdminBottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: Colors.primary500, tabBarInactiveTintColor: "gray" }}>
      <Tab.Screen
        name="Home Screen"
        component={AdminHomeScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Rides"
        component={ReviewScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} /> }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigation;
