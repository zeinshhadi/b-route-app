import { Provider } from "react-redux";
import store from "./core/redux/store";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import LoginScreen from "./screens/authScreens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/authScreens/RegisterScreen";
import HomeScreen from "./screens/userScreens/HomeScreen";
import AdminHomeScreen from "./screens/adminScreens/AdminHomeScreen";
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
              <Stack.Screen name="BusDetailScreen" component={BusDetails} options={{ headerShown: true }} />
              <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: true }} />
              <Stack.Screen name="UserFeedbackScreen" component={UserFeedback} options={{ headerShown: true }} />
              <Stack.Screen name="BusesRegistered" component={BusesRegisteredScreen} options={{ headerShown: true }} />
              <Stack.Screen name="BusInformation" component={BusInformationScreen} options={{ headerShown: true }} />
              <Stack.Screen name="ZonesRegistered" component={ZonesRegisteredScreen} options={{ headerShown: true }} />
              <Stack.Screen name="AddDriverScreen" component={AddDriverScreen} options={{ headerShown: true }} />
              <Stack.Screen name="AddBusScreen" component={AddBusScreen} options={{ headerShown: true }} />
              <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ headerShown: true }} />
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
