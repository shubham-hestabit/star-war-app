"use client";

export async function getPaginatedCharacters(page = 1) {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function getCharacter(id) {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function getFilm(id) {
    const response = await fetch(`https://swapi.dev/api/films/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function getPlanet(id) {
    const response = await fetch(`https://swapi.dev/api/planets/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function getSpecies(id) {
    const response = await fetch(`https://swapi.dev/api/species/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function getStarship(id) {
    const response = await fetch(`https://swapi.dev/api/starships/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export async function getVehicle(id) {
    const response = await fetch(`https://swapi.dev/api/vehicles/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export function getImageById(id, type) {
    return `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`;
}