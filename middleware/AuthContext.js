    import React, {createContext, useEffect, useState} from "react";
    import AsyncStorage from '@react-native-async-storage/async-storage';

    export const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [userInfo, setUserInfo] = useState(null);

        useEffect(() => {
            const checkToken = async () => {
                const token = await AsyncStorage.getItem('token');
                const userInfo = await AsyncStorage.getItem('userInfo');
                if (token) {
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
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(user));
        };

        const logout = async () => {
            setIsLoggedIn(false);
            setUserInfo(null);
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userInfo');
        };

        return (
            <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };
