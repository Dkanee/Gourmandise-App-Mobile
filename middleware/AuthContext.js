import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => setIsLoggedIn(true);


    const logout = () => {
        setIsLoggedIn(false);

        clearUserData(); //données sont effacées lors de la déconnexion
    };

    // Définissez clearUserData pour effacer les données utilisateur spécifiques ou réinitialiser les états
    const clearUserData = () => {
        console.log("User data cleared");
        // Effacez ici les données utilisateur spécifiques stockées dans le contexte ou effectuez d'autres nettoyages
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, clearUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

// import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// export const AuthContext = createContext();
//
// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     // Ajoutez un état pour stocker les informations de l'utilisateur
//     const [userInfo, setUserInfo] = useState(null);
//
//     useEffect(() => {
//         // Vérifiez le token au démarrage de l'application
//         checkToken();
//     }, []);
//
//     const checkToken = async () => {
//         try {
//             const token = await AsyncStorage.getItem('userToken');
//             if (token) {
//                 setIsLoggedIn(true);
//                 // Supposons que vous stockez aussi les infos de l'utilisateur sous forme de chaîne
//                 const storedUserInfo = await AsyncStorage.getItem('userInfo');
//                 if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
//             }
//         } catch (error) {
//             console.log("Erreur de récupération du token", error);
//         }
//     };
//
//     const storeToken = async (token) => {
//         try {
//             await AsyncStorage.setItem('userToken', token);
//         } catch (error) {
//             console.log("Erreur de stockage du token", error);
//         }
//     };
//
//     // Fonction pour stocker les informations de l'utilisateur
//     const storeUserInfo = async (userInfo) => {
//         try {
//             const userInfoString = JSON.stringify(userInfo);
//             await AsyncStorage.setItem('userInfo', userInfoString);
//             setUserInfo(userInfo);
//         } catch (error) {
//             console.log("Erreur de stockage des infos utilisateur", error);
//         }
//     };
//
//     const login = async (token, userInfo) => {
//         setIsLoggedIn(true);
//         await storeToken(token);
//         await storeUserInfo(userInfo);
//     };
//
//     const logout = async () => {
//         setIsLoggedIn(false);
//         await AsyncStorage.removeItem('userToken');
//         await AsyncStorage.removeItem('userInfo');
//         setUserInfo(null);
//         // Ajoutez ici toute logique supplémentaire de nettoyage si nécessaire
//         console.log("User data cleared");
//         // Effacez ici les données utilisateur spécifiques stockées dans le contexte ou effectuez d'autres nettoyages
//     };
//
//     return (
//         <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
