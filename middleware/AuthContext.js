    import React, {createContext, useEffect, useState} from "react";
    import AsyncStorage from '@react-native-async-storage/async-storage';

    export const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [userInfo, setUserInfo] = useState(null);

        useEffect(() => {
            const checkToken = async () => {
                const userToken = await AsyncStorage.getItem('userToken');
                const userInfo = await AsyncStorage.getItem('userInfo');
                if (userToken) {
                    setIsLoggedIn(true);
                    // Vous pouvez aussi vouloir récupérer et définir les infos de l'utilisateur ici
                }
                if (userInfo) {
                    setUserInfo(JSON.parse(userInfo));
                }
            };

            checkToken();
        }, []);
        const login = async (token, user) => {
            setIsLoggedIn(true);
            setUserInfo(user);
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(user));
        };

        const logout = async (navigation) => {
            setIsLoggedIn(false);
            setUserInfo(null);
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userInfo');
            await AsyncStorage.removeItem('cart');


        };


        return (
            <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };
