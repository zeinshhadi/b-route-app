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
import SearchBar from "./components/common/SearchBar";
import ProfileCard from "./components/cards/ProfileCard";
import EditProfile from "./screens/userScreens/EditProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="black" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LogInScreen">
            <Stack.Screen name="LogInScreen" component={EditProfile} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BusDetailScreen" component={BusDetails} />
            <Stack.Screen name="UserFeedbackScreen" component={UserFeedback} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
