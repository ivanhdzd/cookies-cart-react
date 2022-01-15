import { TProduct, TProductList } from './product';

export type TCart = {
  products: TProductList;
};

export function addProduct(cart: TCart, product: TProduct): TCart {
  return { ...cart, products: [...cart.products, product] };
}

export function contains(cart: TCart, product: TProduct): boolean {
  return cart.products.some(({ id }: TProduct): boolean => id === product.id);
}
