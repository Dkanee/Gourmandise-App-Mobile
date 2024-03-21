// @ts-ignore

import React, { Component, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Header } from "react-native/Libraries/NewAppScreen";
import CustomDrawer from "./CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navbar from "../component/Navbar";
import { Text, View, TouchableOpacity } from "react-native";
import Login from "../screens/LoginScreen";
import { AuthContext } from "../middleware/AuthContext";
import Createacc from "../screens/Createacc";
import Produits from "../screens/Produits";
import {AntDesign, Entypo} from "@expo/vector-icons";
import Profil from "../screens/Profil";
import Panier from "../screens/Panier";
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
                    drawerPosition: 'right',
                }}
            >
                <Drawer.Screen
                    name="Accueil"
                    component={Home}
                    options={() => ({
                        header: (props) => <Navbar {...props} title="Accueil"></Navbar>,
                        drawerIcon: (color) => (
                            <Ionicons name="home-outline" size={22} color={'#582900'} />
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
                                <AntDesign name="login" size={22} color={'#582900'} />
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
                                <Ionicons name="log-out-outline" size={22} color={'#582900'} />
                            ),
                        })}
                    />

                )}
                <Drawer.Screen
                    name="Produits"
                    component={Produits}
                    options={() => ({
                        header: (props) => <Navbar {...props} title="Produits"></Navbar>,
                        drawerIcon: (color) => (
                            <Entypo name="shopping-bag" size={22} color={'#582900'} />
                        ),
                    })}
                />

                <Drawer.Screen
                    name="Panier"
                    component={Panier}
                    options={() => ({
                        header: (props) => <Navbar {...props} title="Panier"></Navbar>,
                        drawerIcon: (color) => (
                            <Entypo name="shopping-cart" size={22} color={'#582900'} />
                        ),
                    })}
                />
                {isLoggedIn ? (
                <Drawer.Screen
                    name="Profil"
                    component={Profil}
                    options={() => ({
                        header: (props) => <Navbar {...props} title="Profil"></Navbar>,
                        drawerIcon: (color) => (
                            <Entypo name="user" size={22} color={'#582900'} />
                        ),

                    })}
                />
                ) : (

                <Drawer.Screen
                    name="Createacc"
                    component={Createacc}
                    options={{
                        headerShown: false,
                        drawerLabel: () => null,
                    }}
                />)}

            </Drawer.Navigator>
        </NavigationContainer>
    );
}