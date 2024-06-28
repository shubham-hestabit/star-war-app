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

    useEffect(() => {
        if (favorites.length !== 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    function isFavorite(id) {
        return favorites.includes(id);
    }

    function toggleFavorite(id) {
        if (isFavorite(id)) {
            setFavorites(favorites.filter((favorite) => favorite !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    }

    return {
        toggleFavorite,
        isFavorite,
    };
}