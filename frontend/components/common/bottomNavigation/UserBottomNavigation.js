import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EditProfile from "../../../screens/userScreens/EditProfile";
import ChatScreen from "../../../screens/common/ChatScreen";
import HomeScreen from "../../../screens/userScreens/HomeScreen";
import Colors from "../../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import UserRideScreen from "../../../screens/userScreens/UserRideScreen";
const Tab = createBottomTabNavigator();

const UserBottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: Colors.primary500, tabBarInactiveTintColor: "gray" }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
        component={UserRideScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={EditProfile}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default UserBottomNavigation;
