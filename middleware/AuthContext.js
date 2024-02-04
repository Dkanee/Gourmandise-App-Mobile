import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => setIsLoggedIn(true);

    const logout = () => {
        setIsLoggedIn(false);
        // Ajoutez ici toute logique supplémentaire de nettoyage si nécessaire
        clearUserData(); // Appelée ici pour s'assurer que les données sont effacées lors de la déconnexion
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
