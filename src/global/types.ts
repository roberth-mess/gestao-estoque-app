export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export interface User {
  email: string;
  name: string;
}

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
};

export type BottomTabParamList = {
  RegisterProduct: undefined;
  InventoryList: undefined;
  StockOut: undefined;
};
