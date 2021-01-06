import { Product } from "../../data/ProductsData";

export enum BasketActionTypes {
  ADD = "BASKET/ADD"
}

export interface BasketState {
  readonly products: Product[];
}

export interface BasketAdd {
  type: BasketActionTypes.ADD;
  product: Product;
}

export type BasketActions = BasketAdd;
