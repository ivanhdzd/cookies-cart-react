import { TCart } from './cart';
import { totalPrice, TProductList } from './product';
import { TUser } from './user';

export type TOrderStatus = 'new' | 'delivery' | 'completed';

export type TOrder = {
  user: TUniqueId;
  products: TProductList;
  created: TDateTimeString;
  status: TOrderStatus;
  total: TPriceCents;
};

export function createOrder(
  user: TUser,
  cart: TCart,
  created: TDateTimeString,
): TOrder {
  return {
    user: user.id,
    products: [...cart.products],
    created,
    status: 'new',
    total: totalPrice(cart.products),
  };
}
