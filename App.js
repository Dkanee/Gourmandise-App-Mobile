// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import LoginScreen from "./screens/LoginScreen.js"; // Importez le composant LoginScreen
// import Createacc from "./screens/Createacc";
// import Home from "./screens/Home";
//
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Home />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen.js";
import Createacc from "./screens/Createacc";
import Home from "./screens/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import Home from "./screens/Home";
//
// const Stack = createStackNavigator();
//
// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={Home} />
//         {/* Autres écrans ici */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
//
// export default App;
