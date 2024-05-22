import React, { createContext, useContext, useState } from 'react';

const NavigationHistoryContext = createContext();

export const NavigationHistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

    const addRouteToHistory = (routeName) => {
        setHistory((prevHistory) => [...prevHistory, routeName]);
    };

    const getPreviousRoute = () => {
        return history.length > 1 ? history[history.length - 2] : null;
    };

    return (
        <NavigationHistoryContext.Provider value={{ addRouteToHistory, getPreviousRoute }}>
            {children}
        </NavigationHistoryContext.Provider>
    );
};

export const useHistoryNavigation = () => useContext(NavigationHistoryContext);
