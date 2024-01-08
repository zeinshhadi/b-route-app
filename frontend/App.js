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
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="black" />
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="AdminHomeScreen">
              <Stack.Screen name="LogInScreen" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="BusDetailScreen" component={BusDetails} options={{ headerShown: true }} />
              <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: true }} />
              <Stack.Screen name="UserFeedbackScreen" component={UserFeedback} options={{ headerShown: true }} />
              <Stack.Screen name="BusesRegistered" component={BusesRegisteredScreen} options={{ headerShown: true }} />
              <Stack.Screen name="BusInformation" component={BusInformationScreen} options={{ headerShown: true }} />
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
