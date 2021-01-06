import { BasketActionTypes, BasketAdd } from "./BasketTypes";
import { Product } from "../../data/ProductsData";

export const addToBasket = (product: Product): BasketAdd => ({
  product,
  type: BasketActionTypes.ADD
});
