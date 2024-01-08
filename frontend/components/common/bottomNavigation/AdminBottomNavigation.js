import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AdminHomeScreen from "../../../screens/adminScreens/AdminHomeScreen";
import EditProfile from "../../../screens/userScreens/EditProfile";
import ChatScreen from "../../../screens/common/ChatScreen";
import ReviewScreen from "../../../screens/adminScreens/ReviewScreen";

const Tab = createBottomTabNavigator();

const AdminBottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home Screen" component={AdminHomeScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Rides" component={ReviewScreen} />
      <Tab.Screen name="EditProfile" component={EditProfile} />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigation;
