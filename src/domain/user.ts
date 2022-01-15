export type TUsername = string;

export type TUser = {
  id: TUniqueId;
  name: TUsername;
  email: TEmail;
  preferences: TIngredient[];
  allergies: TIngredient[];
};

export function hasAllergy(user: TUser, ingredient: TIngredient): boolean {
  return user.allergies.includes(ingredient);
}

export function hasPreferences(user: TUser, ingredient: TIngredient): boolean {
  return user.preferences.includes(ingredient);
}
