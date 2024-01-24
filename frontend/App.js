import { Provider } from "react-redux";
import store from "./core/redux/store";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import LoginScreen from "./screens/authScreens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/authScreens/RegisterScreen";
import BusDetails from "./screens/userScreens/BusDetails";
import UserFeedback from "./screens/userScreens/UserFeedback";
import EditProfile from "./screens/userScreens/EditProfile";
import BusesRegisteredScreen from "./screens/adminScreens/BusesRegisteredScreen";
import BusInformationScreen from "./screens/adminScreens/BusInformationScreen";
import ZonesRegisteredScreen from "./screens/adminScreens/ZonesRegisteredScreen";
import AddDriverScreen from "./screens/adminScreens/AddDriverScreen";
import AddBusScreen from "./screens/adminScreens/AddBusScreen";
import ReviewScreen from "./screens/adminScreens/ReviewScreen";
import UserBottomNavigation from "./components/common/bottomNavigation/UserBottomNavigation";
import AdminBottomNavigation from "./components/common/bottomNavigation/AdminBottomNavigation";
import AddZoneScreen from "./screens/adminScreens/AddZoneScreen";
import BusesByZone from "./screens/adminScreens/BusesByZone";
import DriverBottomNavigation from "./components/common/bottomNavigation/DriverBottomNavigation";
import UserRideScreen from "./screens/userScreens/UserRideScreen";
import ChatScreen from "./screens/common/ChatScreen";
import AdminChatScreen from "./screens/adminScreens/AdminChatScreen";
import IndividualChatScreen from "./screens/adminScreens/IndividualChatScreen";
import Colors from "./utils/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="black" />
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="LogInScreen">
              <Stack.Screen name="LogInScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="HomeScreen" component={UserBottomNavigation} options={{ headerShown: false }} />
              <Stack.Screen name="AdminHomeScreen" component={AdminBottomNavigation} options={{ headerShown: false }} />
              <Stack.Screen
                name="DriverHomeScreen"
                component={DriverBottomNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BusDetailScreen"
                component={BusDetails}
                options={{
                  headerShown: true,
                  headerTitle: "Bus Details",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  headerShown: true,
                  headerTitle: "Profile",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="UserFeedbackScreen"
                component={UserFeedback}
                options={{
                  headerShown: true,
                  headerTitle: "Feedback Screen",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="BusesRegistered"
                component={BusesRegisteredScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Buses Registered",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="BusInformation"
                component={BusInformationScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Bus Info Screen",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="ZonesRegistered"
                component={ZonesRegisteredScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Zones Screen",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="AddDriverScreen"
                component={AddDriverScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Add Driver Screen",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="AddBusScreen"
                component={AddBusScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Add Bus Screen",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="ReviewScreen"
                component={ReviewScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Review Screen",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="AddZoneScreen"
                component={AddZoneScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Add Zone",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="BusesByZone"
                component={BusesByZone}
                options={{
                  headerShown: true,
                  headerTitle: "Buses in zone",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="UserRideScreen"
                component={UserRideScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Buses in zone",
                  headerStyle: { backgroundColor: Colors.primary500 },
                }}
              />
              <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Chat Screen",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="AdminChatScreen"
                component={AdminChatScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Chat Screen",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
              <Stack.Screen
                name="IndividualChatScreen"
                component={IndividualChatScreen}
                options={{
                  headerShown: true,
                  headerTitle: "Chat Screen",
                  headerStyle: { backgroundColor: Colors.primary500 },
                  headerTintColor: "white",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
