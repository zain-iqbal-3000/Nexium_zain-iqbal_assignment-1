"use client";

import TabsContainer from "./TabsContainer";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function ClientPage() {
  return (
    <FavoritesProvider>
      <TabsContainer />
    </FavoritesProvider>
  );
}
