"use client";

import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  
  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteQuotes");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Failed to parse stored favorites:", error);
      }
    }
  }, []);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (favorites.length) {
      localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
    }
  }, [favorites]);
  
  const addFavorite = (quote) => {
    // Check if quote already exists in favorites
    if (!favorites.some(fav => fav.quote === quote.quote && fav.author === quote.author)) {
      setFavorites(prev => [...prev, quote]);
    }
  };
  
  const removeFavorite = (quote) => {
    setFavorites(prev => 
      prev.filter(item => !(item.quote === quote.quote && item.author === quote.author))
    );
  };
  
  const isFavorite = (quote) => {
    return favorites.some(fav => fav.quote === quote.quote && fav.author === quote.author);
  };
  
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
