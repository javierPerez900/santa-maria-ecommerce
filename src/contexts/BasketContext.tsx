"use client";
import { useState, useEffect, createContext } from "react";
import { basketCtrl } from "@/api";

interface BasketProductType {
  id: number;
  quantity: number;
}

interface BasketContextType {
  basket: BasketProductType[] | null;
  total: number;
  addBasket: (productId: number) => void;
  deleteItem: (productId: number) => void;
  deleteAllItems: () => void;
  changeQuantityItem: (productId: number, quantity: number) => void;
}

export const BasketContext = createContext<BasketContextType>({
  basket: null,
  total: 0,
  addBasket: () => undefined,
  deleteItem: () => undefined,
  deleteAllItems: () => undefined,
  changeQuantityItem: () => undefined,
});

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<BasketProductType[] | null>(null);
  const [total, setTotal] = useState<number>(basketCtrl.count());

  useEffect(() => {
    const response = basketCtrl.getAll();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura inicial de localStorage, no disponible durante SSR
    setBasket(response);
  }, []);

  const refreshBasket = () => {
    setTotal(basketCtrl.count());
    setBasket(basketCtrl.getAll());
  };

  const addBasket = (productId: number) => {
    basketCtrl.add(productId);
    refreshBasket();
  };

  const changeQuantityItem = (productId: number, quantity: number) => {
    basketCtrl.changeQuantity(productId, quantity);
    refreshBasket();
  };

  const deleteItem = (productId: number) => {
    basketCtrl.deleteItem(productId);
    refreshBasket();
  };

  const deleteAllItems = () => {
    basketCtrl.deleteAll();
    refreshBasket();
  };

  const data: BasketContextType = {
    basket,
    total,
    addBasket,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return (
    <BasketContext.Provider value={data}>{children}</BasketContext.Provider>
  );
}
