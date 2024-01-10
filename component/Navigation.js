import React, { Component, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Header } from "react-native/Libraries/NewAppScreen";
import CustomDrawer from "./CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "./Navbar";
import { Text, View, TouchableOpacity } from "react-native";
import Login from "../screens/LoginScreen";
import { AuthContext } from "../middleware/AuthContext";
import Createacc from "../screens/Createacc";
const Drawer = createDrawerNavigator();

export default function navigation() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={"Accueil"}
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: true,
          drawerActiveBackgroundColor: "#6C534E",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            marginLeft: -25,
            fontSize: 15,
          },
        }}
      >
        <Drawer.Screen
          name="Accueil"
          component={Home}
          options={() => ({
            header: (props) => <Navbar {...props} title="Accueil"></Navbar>,
            drawerIcon: (color) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          })}
        />

        {!isLoggedIn ? (
          <Drawer.Screen
            name="Login"
            component={Login}
            options={() => ({
              header: (props) => <Navbar {...props} title="Login"></Navbar>,
              drawerIcon: (color) => (
                <Ionicons name="home-outline" size={22} color={color} />
              ),
            })}
          />
        ) : (
          <Drawer.Screen
            name="Deconnexion"
            component={Login}
            options={() => ({
              header: (props) => <Navbar {...props} title="Logout"></Navbar>,
              drawerIcon: (color) => (
                <Ionicons name="home-outline" size={22} color={color} />
              ),
            })}
          />
        )}
        <Drawer.Screen
          name="Createacc"
          component={Createacc}
          options={{
            headerShown: false,
            drawerLabel: () => null,
          }}
        />

        {/*<Drawer.Screen*/}
        {/*  name="Produits"*/}
        {/*  component={Produits}*/}
        {/*  options={{*/}
        {/*    drawerIcon: (color) => (*/}
        {/*      <Ionicons*/}
        {/*        name="american-football-outline"*/}
        {/*        size={22}*/}
        {/*        color={color}*/}
        {/*      />*/}
        {/*), }} />*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
