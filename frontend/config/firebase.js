import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDvsMHeEEeaOrSB8GyxtuRWBodjuQuQdJ8",
  authDomain: "chat-system-3d283.firebaseapp.com",
  databaseURL: "https://chat-system-3d283-default-rtdb.firebaseio.com/",
  projectId: "chat-system-3d283",
  storageBucket: "chat-system-3d283.appspot.com",
  messagingSenderId: "232710943084",
  appId: "1:232710943084:web:b5c71fefa150d002d30349",
};
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
