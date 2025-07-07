"use client";

import { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function FavoriteQuotes() {
  const { favorites, removeFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);
  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFavorites(favorites);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = favorites.filter(quote => 
        quote.quote.toLowerCase().includes(lowerSearchTerm) || 
        quote.author.toLowerCase().includes(lowerSearchTerm)
      );
      setFilteredFavorites(filtered);
    }
  }, [searchTerm, favorites]);
  // Search input
  const renderSearchInput = () => (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Search quotes or authors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-stone-50 dark:bg-stone-700 border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-100"
      />
    </div>
  );

  if (favorites.length === 0) {
    return (
      <div className="text-center py-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 mx-auto mb-4 text-stone-400 dark:text-stone-500">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        <h3 className="text-xl font-semibold text-stone-700 dark:text-stone-300 mb-2">No favorites yet</h3>
        <p className="text-stone-500 dark:text-stone-400">
          Click the heart icon on any quote to add it to your favorites
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-stone-700 dark:text-stone-100 flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-stone-500 dark:text-stone-400"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        Your Favorite Quotes
      </h2>
      
      {renderSearchInput()}
      
      {filteredFavorites.length === 0 && searchTerm && (
        <div className="text-center py-6">
          <p className="text-stone-500 dark:text-stone-400">
            No quotes found matching &quot;{searchTerm}&quot;
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-4">
        {filteredFavorites.map((quote, index) => (
          <Card
            key={index}
            className="bg-white/80 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 overflow-hidden"
          >
            <CardContent className="pt-6">
              <div className="relative">
                <span className="absolute -top-5 left-0 text-6xl opacity-20 font-serif text-stone-400 dark:text-stone-500">
                  
                </span>
                <blockquote className="pl-5 italic text-stone-700 dark:text-stone-100">
                  {quote.quote}
                </blockquote>
              </div>
            </CardContent>
            <CardFooter className="border-t border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/70 flex justify-between">
              <p className="text-stone-500 dark:text-stone-400 text-sm">- {quote.author}</p>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => removeFavorite(quote)}
                className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                aria-label="Remove from favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
