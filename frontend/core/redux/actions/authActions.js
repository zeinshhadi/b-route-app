import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const login = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://192.168.1.7:8000/api/login", {
        email,
        password,
      });
      const data = response.data;
      if (data.status == "success" && data.authorization && data.authorization.token) {
        const token = data.authorization.token;
        try {
          await AsyncStorage.setItem("userToken", token);
          console.log(`Token stored successfully: ${token}`);
        } catch (error) {
          console.error("Error storing token:", error);
        }
        dispatch({
          type: "LogIn Success",
          payload: {
            token: token,
            user: data.user,
          },
        });
      } else {
        dispatch({
          type: "LogIn Failed",
          payload: "Wrong Credentials Entered",
        });
      }
    } catch (error) {
      let errorMessage = "Network Error";
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = "Wrong Credentials";
        } else {
          errorMessage = errorMessage;
        }
      }
      dispatch({
        type: "LogIn Failed",
        payload: errorMessage,
      });
    }
  };
};

export default login;
