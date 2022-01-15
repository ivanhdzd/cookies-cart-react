import { TCart } from './cart';
import { totalPrice } from './product';
import { TUser } from './user';

export type TOrderStatus = 'new' | 'delivery' | 'completed';

export type TOrder = {
  user: TUniqueId;
  cart: TCart;
  created: TDateTimeString;
  status: TOrderStatus;
  total: TPriceCents;
};

export function createOrder(user: TUser, cart: TCart): TOrder {
  return {
    user: user.id,
    cart,
    created: new Date().toISOString(),
    status: 'new',
    total: totalPrice(cart.products),
  };
}
