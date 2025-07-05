"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import QuoteGenerator from "./QuoteGenerator";
import FavoriteQuotes from "./FavoriteQuotes";
import ThemeToggle from "./ThemeToggle";

export default function TabsContainer() {
  const [activeTab, setActiveTab] = useState("generator");

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeToggle />
      
      <div className="container mx-auto py-10 px-4 flex-1">
        <div className="max-w-lg mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-stone-700 dark:text-stone-50 mb-2">Quote Generator</h1>
            <p className="text-stone-500 dark:text-stone-300">Discover and save your favorite quotes</p>
          </div>

          <Tabs defaultValue="generator" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-stone-100 dark:bg-stone-800">
              <TabsTrigger 
                value="generator" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
              >
                Generator
              </TabsTrigger>
              <TabsTrigger 
                value="favorites"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-stone-700"
              >
                Favorites
              </TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="generator" className="mt-0">
                <QuoteGenerator />
              </TabsContent>
              <TabsContent value="favorites" className="mt-0">
                <FavoriteQuotes />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      <footer className="py-6 text-center text-stone-500 dark:text-stone-400 text-sm border-t border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-transparent">
        <p>© {new Date().getFullYear()} Quote Generator | Built with Next.js & ShadcN UI</p>
      </footer>
    </div>
  );
}
