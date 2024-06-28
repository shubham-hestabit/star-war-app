import { useState } from 'react';

export default function useFavorite() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites') ?? '[]'));

    function toggleFavorite(id) {
        setFavorites(prevFavorites => {
            const isCurrentlyFavorite = prevFavorites.includes(id);
            let newFavorites;

            if (isCurrentlyFavorite) {
                newFavorites = prevFavorites.filter(favourite => favourite !== id);
            } else {
                newFavorites = [...prevFavorites, id];
            }

            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    }

    function isFavorite(id) {
        return favorites.includes(id);
    }

    return {
        toggleFavorite,
        isFavorite,
    };
}
