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
    const { isLoggedIn, setIsLoggedIn,logout } = useContext(AuthContext);
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
                            <Entypo name="home" size={22} color={'#582900'} />
                        ),
                    })}
                />

                {!isLoggedIn ? (
                    <Drawer.Screen
                        name="Se connecter"
                        component={Login}
                        options={() => ({
                            header: (props) => <Navbar {...props} title="Se connecter"></Navbar>,
                            drawerIcon: (color) => (
                                <Entypo name="login" size={22} color={'#582900'} />
                            ),
                        })}
                    />
                ) : (
                    <Drawer.Screen
                        name="Deconnexion"
                        listeners={({ navigation }) => ({
                            focus: () => logout(navigation), // Déclenche la déconnexion lorsque l'utilisateur navigue vers ce Drawer.Screen
                        })}
                        component={Login} // Il est possible que vous souhaitiez avoir un composant vide ou une redirection automatique ici, car le listener s'occupera de la déconnexion
                        options={{
                            header: (props) => <Navbar {...props} title="Se connecter"></Navbar>,
                            drawerLabel: 'Déconnexion',
                            drawerIcon: ({ color }) => <Entypo name="log-out" size={22} color={'#582900'} />,
                            // Gérer la déconnexion lors du clic
                            listeners: {
                                press: (e) => {
                                    e.preventDefault(); // Empêcher la navigation
                                    logout(); // Déclencher la fonction de déconnexion
                                },
                            },
                        }}
                    />
                )}
                {!isLoggedIn &&  (
                    <Drawer.Screen
                        name="Créer compte"
                        component={Createacc}
                        options={() => ({
                            header: (props) => <Navbar {...props} title="Création de compte"></Navbar>,
                            drawerIcon: (color) => (
                                <Entypo name="user" size={22} color={'#582900'} />
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
                {isLoggedIn &&  (
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
                    )}







            </Drawer.Navigator>
        </NavigationContainer>
    );
}