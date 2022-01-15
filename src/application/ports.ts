import { TCart } from '../domain/cart';
import { TOrder } from '../domain/order';
import { TUser, TUsername } from '../domain/user';

export interface IUserStorageService {
  user?: TUser;
  updateUser(user: TUser): void;
}

export interface ICartStorageService {
  cart: TCart;
  updateCart(cart: TCart): void;
  emptyCart(): void;
}

export interface IOrdersStorageService {
  orders: TOrder[];
  updateOrders(orders: TOrder[]): void;
}

export interface IAuthenticationStorageService {
  auth(name: TUsername, email: TEmail): Promise<TUser>;
}

export interface INotificationService {
  notify(message: string): void;
}

export interface IPaymentsService {
  tryPay(amount: TPriceCents): Promise<boolean>;
}

export interface IDateTimeService {
  currentDateTime(): TDateTimeString;
}
