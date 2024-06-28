"use client";
import { useEffect, useContext } from 'react';
import { FavoriteContext } from '@/app/context/favoriteContext';

export default function useFavourite() {
    const { favorites, setFavorites } = useContext(FavoriteContext);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites) {
            setFavorites(storedFavorites);
        }
    }, []);

    function isFavorite(id) {
        return favorites.includes(id);
    }

    function toggleFavorite(id) {
        if (isFavorite(id)) {
            setFavorites((prev) => {
                const fav = prev.filter((favorite) => favorite !== id);
                localStorage.setItem("favorites", JSON.stringify(fav));
                return fav;
            });
        } else {
            setFavorites(prev => {
                const fav = [...prev, id];
                localStorage.setItem("favorites", JSON.stringify(fav));
                return fav;
            });
        }
    }

    return { toggleFavorite, isFavorite };
}