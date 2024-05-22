import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import Navbar from "../component/Navbar";
import { AuthContext } from "../middleware/AuthContext";
import Createacc from "../screens/Createacc";
import Produits from "../screens/Produits";
import { Entypo } from "@expo/vector-icons";
import Profil from "../screens/Profil";
import Panier from "../screens/Panier";
import RechercheProduits from "../screens/RechercheProduits";
import HistoriqueC from "../screens/HistoriqueC";
import CommandeDetailsScreen from "../screens/CommandeDetailsScreen";
import ModifyProfil from "../screens/ModifyProfil";
import LoginScreen from "../screens/LoginScreen";
import { AuthProvider } from "../middleware/AuthContext";
const Drawer = createDrawerNavigator();

export default function navigation() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  console.log(isLoggedIn);

  return (
    <AuthProvider>
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
            drawerPosition: "right",
          }}
        >
          <Drawer.Screen
            name="Accueil"
            component={Home}
            options={() => ({
              header: (props) => <Navbar {...props} title="Accueil"></Navbar>,
              drawerIcon: (color) => (
                <Entypo name="home" size={22} color={"#582900"} />
              ),
            })}
          />

          {isLoggedIn && (
            <Drawer.Screen
              name="Profil"
              component={Profil}
              options={() => ({
                header: (props) => <Navbar {...props} title="Profil"></Navbar>,
                drawerIcon: (color) => (
                  <Entypo name="user" size={22} color={"#582900"} />
                ),
              })}
            />
          )}

          {!isLoggedIn ? (
            <Drawer.Screen
              name="Se connecter"
              component={LoginScreen}
              options={() => ({
                header: (props) => (
                  <Navbar {...props} title="Se connecter"></Navbar>
                ),
                drawerIcon: (color) => (
                  <Entypo name="login" size={22} color={"#582900"} />
                ),
              })}
            />
          ) : (
            <Drawer.Screen
              name="Deconnexion"
              component={LoginScreen}
              options={{
                header: (props) => (
                  <Navbar {...props} title="Se connecter"></Navbar>
                ),
                drawerLabel: "Déconnexion",
                drawerIcon: ({ color }) => (
                  <Entypo name="log-out" size={22} color={"#582900"} />
                ),
                listeners: ({ navigation }) => ({
                  press: (e) => {
                    e.preventDefault(); // Empêcher la navigation vers le composant associé à ce Drawer.Screen
                    logout(navigation); // Déclencher la fonction de déconnexion en passant l'objet navigation
                    // drawerItemStyle: { display: "none" },
                  },
                }),
              }}
            />
          )}
          {!isLoggedIn && (
            <Drawer.Screen
              name="Créer compte"
              component={Createacc}
              options={() => ({
                header: (props) => (
                  <Navbar {...props} title="Création de compte"></Navbar>
                ),
                drawerIcon: (color) => (
                  <Entypo name="user" size={22} color={"#582900"} />
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
                <Entypo name="shopping-bag" size={22} color={"#582900"} />
              ),
            })}
          />

          <Drawer.Screen
            name="Panier"
            component={Panier}
            options={() => ({
              header: (props) => <Navbar {...props} title="Panier"></Navbar>,
              drawerIcon: (color) => (
                <Entypo name="shopping-cart" size={22} color={"#582900"} />
              ),
            })}
          />

          <Drawer.Screen
            name="RechercheProduits"
            component={RechercheProduits}
            options={() => ({
              header: (props) => (
                <Navbar {...props} title="Recherche Produits"></Navbar>
              ),
              drawerIcon: (color) => (
                <Entypo name="user" size={22} color={"#582900"} />
              ),
              drawerItemStyle: { display: "none" },
            })}
          />
          <Drawer.Screen
            name="Historique des commandes"
            component={HistoriqueC}
            options={() => ({
              header: (props) => (
                <Navbar {...props} title="Historique des commandes"></Navbar>
              ),
              drawerIcon: (color) => (
                <Entypo name="user" size={22} color={"#582900"} />
              ),
              drawerItemStyle: { display: "none" },
            })}
          />

          {/*<Drawer.Screen*/}
          {/*    name="Détails de la commande"*/}
          {/*    component={CommandeDetailsScreen}*/}
          {/*    options={() => ({*/}
          {/*        header: (props) => <Navbar {...props} title="Détails de la commande"></Navbar>,*/}
          {/*        drawerIcon: (color) => (*/}
          {/*            <Entypo name="user" size={22} color={'#582900'} />*/}
          {/*        ),*/}
          {/*        drawerItemStyle: { display: 'none' },*/}

          {/*    })}*/}

          {/*/>*/}

          <Drawer.Screen
            name="Modifier Profil"
            component={ModifyProfil}
            options={() => ({
              header: (props) => (
                <Navbar {...props} title="Modifier Profil"></Navbar>
              ),
              drawerIcon: (color) => (
                <Entypo name="user" size={22} color={"#582900"} />
              ),
              drawerItemStyle: { display: "none" },
            })}
          />
          {isLoggedIn && (
            <Drawer.Screen
              name="Détails de la commande"
              component={CommandeDetailsScreen}
              options={() => ({
                header: (props) => (
                  <Navbar {...props} title="Détails de la commande"></Navbar>
                ),
                drawerIcon: (color) => (
                  <Entypo name="user" size={22} color={"#582900"} />
                ),
                drawerItemStyle: { display: "none" },
              })}
            />
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
