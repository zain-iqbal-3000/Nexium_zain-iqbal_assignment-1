"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import quotes from "../data/quotes.json";
import { useFavorites } from "../context/FavoritesContext";

export default function QuoteGenerator() {
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const form = useForm({
    defaultValues: {
      topic: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Adding a small delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const topic = data.topic.toLowerCase();
    let topicQuotes = [];
    
    // Try to find exact match first
    if (quotes[topic]) {
      topicQuotes = quotes[topic];
    } else {
      // If no exact match, select random category
      const categories = Object.keys(quotes);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      topicQuotes = quotes[randomCategory];
    }
    
    // Shuffle quotes and get 3
    const shuffled = [...topicQuotes].sort(() => 0.5 - Math.random());
    setSelectedQuotes(shuffled.slice(0, 3));
    setTopic(data.topic);
    setIsLoading(false);
  };

  return (
    <div>
      <Card className="bg-white/90 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-stone-700 dark:text-stone-100 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5 mr-2 text-stone-500 dark:text-stone-400"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
            Find Your Inspiration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-stone-600 dark:text-stone-200">Topic</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter a topic (e.g., motivation, technology, creativity)" 
                        className="bg-stone-50 dark:bg-stone-700 border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-100 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-500"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-stone-600 hover:bg-stone-700 dark:bg-stone-500 dark:hover:bg-stone-600 text-white transition-all duration-200 shadow-lg hover:shadow-stone-300/20 dark:hover:shadow-stone-700/20"
              >
                {isLoading ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate Quotes"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {selectedQuotes.length > 0 && (
        <div className="space-y-4 mt-8">
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
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
            {topic ? `Quotes about "${topic}"` : "Your Quotes"}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {selectedQuotes.map((quote, index) => (
              <Card 
                key={index} 
                className={`bg-white/80 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-${(index + 1) * 3}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="relative">
                    <span className="absolute -top-5 left-0 text-6xl opacity-20 font-serif text-stone-400 dark:text-stone-500"></span>
                    <blockquote className="pl-5 italic text-stone-700 dark:text-stone-100">
                      {quote.quote}
                    </blockquote>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/70 flex justify-between items-center">
                  <p className="text-stone-500 dark:text-stone-400 text-sm">- {quote.author}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      isFavorite(quote) ? removeFavorite(quote) : addFavorite(quote);
                    }}
                    className={`${
                      isFavorite(quote) 
                        ? "text-red-500 hover:text-red-700" 
                        : "text-stone-400 hover:text-red-500"
                    } hover:bg-stone-100 dark:hover:bg-stone-800`}
                    aria-label={isFavorite(quote) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={isFavorite(quote) ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
      )}
    </div>
  );
}
