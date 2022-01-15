import React, { useState } from 'react';
import { useContext } from 'react';
import {
  IUserStorageService,
  IOrdersStorageService,
  ICartStorageService,
} from '../application/ports';
import { TCart } from '../domain/cart';
import { TOrder } from '../domain/order';
import { TUser } from '../domain/user';

interface IStore
  extends IUserStorageService,
    IOrdersStorageService,
    ICartStorageService {}

const INITIAL_STORE: IStore = {
  cart: {
    products: [],
  },
  orders: [],
  updateUser: (_: TUser): void => {},
  updateCart: (_: TCart): void => {},
  updateOrders: (_: TOrder[]): void => {},
  emptyCart: (): void => {},
};

const StoreContext: React.Context<IStore> =
  React.createContext<IStore>(INITIAL_STORE);
export const useStore = (): IStore => useContext(StoreContext);

export const Provider: React.FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState<TUser>();
  const [cart, setCart] = useState<TCart>(INITIAL_STORE.cart);
  const [orders, setOrders] = useState<TOrder[]>(INITIAL_STORE.orders);

  const value: IStore = {
    user,
    cart,
    orders,
    updateUser: setUser,
    updateCart: setCart,
    updateOrders: setOrders,
    emptyCart: (): void => setCart(INITIAL_STORE.cart),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
