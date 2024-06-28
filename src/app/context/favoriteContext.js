'use client';
import { createContext, useState } from "react";

export const FavoriteContext = createContext();

export default function FavoriteProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    return (
        <FavoriteContext.Provider value={{ favorites, setFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
}