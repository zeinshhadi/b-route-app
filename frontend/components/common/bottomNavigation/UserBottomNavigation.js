import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AdminHomeScreen from "../../../screens/adminScreens/AdminHomeScreen";
import EditProfile from "../../../screens/userScreens/EditProfile";
import ChatScreen from "../../../screens/common/ChatScreen";
import ReviewScreen from "../../../screens/adminScreens/ReviewScreen";
import HomeScreen from "../../../screens/userScreens/HomeScreen";
import Colors from "../../../utils/colors";

const Tab = createBottomTabNavigator();

const UserBottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: Colors.primary500, tabBarInactiveTintColor: "gray" }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Rides" component={ReviewScreen} />
      <Tab.Screen name="EditProfile" component={EditProfile} />
    </Tab.Navigator>
  );
};

export default UserBottomNavigation;
