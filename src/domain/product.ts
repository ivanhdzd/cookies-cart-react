export type TProductTitle = string;

export type TProduct = {
  id: TUniqueId;
  title: TProductTitle;
  price: TPriceCents;
  toppings: TIngredient[];
};

export type TProductList = TProduct[];

export const ingredients: Record<TIngredient, string> = {
  chocolate: 'Chocolate',
  cocoa: 'Cocoa Powder',
  cherry: 'Cherry',
  marshmallow: 'Marshmallow',
  peanuts: 'Peanut Butter',
};

export function totalPrice(products: TProduct[]): TPriceCents {
  return products.reduce(
    (total: number, { price }: TProduct): number => total + price,
    0,
  );
}
