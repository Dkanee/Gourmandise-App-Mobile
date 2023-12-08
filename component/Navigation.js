import React, {Component} from "react";
import {NavigationContainer} from "@react-navigation/native";
import Home from "../screens/Home";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Header} from "react-native/Libraries/NewAppScreen";
import CustomDrawer from "./CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "./Navbar";
import {Text, View} from "react-native";
const Drawer = createDrawerNavigator();

export default function navigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName={"Home"}
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
                    name="Home"
                    component={Home}
                    options={() => ({
                        header: (props) => <Navbar {...props} title="Home"></Navbar>,
                        drawerIcon: (color) => (
                            <Ionicons name="home-outline" size={22} color={color}/>
                        ),
                    })
                    }
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
