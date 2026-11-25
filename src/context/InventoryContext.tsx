import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, User } from '../global/types';

interface InventoryContextData {
  user: User | null;
  products: Product[];
  signIn: (email: string) => void;
  signOut: () => void;
  addProduct: (name: string, price: number, quantity: number) => void;
  removeStock: (productId: string, amount: number) => { success: boolean; message: string };
}

const InventoryContext = createContext<InventoryContextData>({} as InventoryContextData);

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Teclado Mecânico RGB',
    price: 289.9,
    quantity: 14,
    createdAt: '25/11/2026',
  },
  {
    id: '2',
    name: 'Mouse Sem Fio Ergônomico',
    price: 129.5,
    quantity: 4,
    createdAt: '25/11/2026',
  },
  {
    id: '3',
    name: 'Monitor 24" Full HD IPS',
    price: 899.0,
    quantity: 0,
    createdAt: '24/11/2026',
  },
  {
    id: '4',
    name: 'Cabo HDMI 2.1 2 metros',
    price: 45.0,
    quantity: 22,
    createdAt: '23/11/2026',
  },
];

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const signIn = (email: string) => {
    const formattedName = email.split('@')[0] || 'Operador';
    setUser({
      email,
      name: formattedName.charAt(0).toUpperCase() + formattedName.slice(1),
    });
  };

  const signOut = () => {
    setUser(null);
  };

  const addProduct = (name: string, price: number, quantity: number) => {
    const newProduct: Product = {
      id: String(Date.now()),
      name: name.trim(),
      price,
      quantity,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const removeStock = (productId: string, amount: number) => {
    const target = products.find((item) => item.id === productId);
    if (!target) {
      return { success: false, message: 'Produto não encontrado no estoque.' };
    }
    if (amount <= 0) {
      return { success: false, message: 'Informe uma quantidade maior que zero.' };
    }
    if (amount > target.quantity) {
      return {
        success: false,
        message: `Saldo insuficiente. Disponível: ${target.quantity} unidade(s).`,
      };
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - amount } : item
      )
    );

    return {
      success: true,
      message: `Baixa de ${amount} unidade(s) de "${target.name}" registrada com sucesso!`,
    };
  };

  return (
    <InventoryContext.Provider
      value={{
        user,
        products,
        signIn,
        signOut,
        addProduct,
        removeStock,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextData => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory deve ser usado dentro de um InventoryProvider');
  }
  return context;
};
