import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminHomeScreen from "../../../screens/adminScreens/AdminHomeScreen";
import EditProfile from "../../../screens/userScreens/EditProfile";
import ChatScreen from "../../../screens/common/ChatScreen";
import ReviewScreen from "../../../screens/adminScreens/ReviewScreen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/colors";
import AdminChatScreen from "../../../screens/adminScreens/AdminChatScreen";
const Tab = createBottomTabNavigator();

const AdminBottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary500,
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: Colors.primary500,
        },
        headerShadowVisible: true,
        tabBarHideOnKeyboard: true,
        headerPressColor: "black",
        freezeOnBlur: true,
        headerTintColor: "white",
        headerTitleContainerStyle: {
          marginLeft: 25,
        },
      }}>
      <Tab.Screen
        name="Admin Screen"
        component={AdminHomeScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,

          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Chat"
        component={AdminChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Review"
        component={ReviewScreen}
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

export default AdminBottomNavigation;
