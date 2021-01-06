import { Product } from "../../data/ProductsData";

export enum ProductsActionTypes {
  GETALL = "PRODUCTS/GETALL",
  GETSINGLE = "PRODUCTS/GETSINGLE",
  LOADING = "PRODUCTS/LOADING"
}

export interface ProductsGetAllAction {
  type: ProductsActionTypes.GETALL;
  products: Product[];
}

export interface ProductsLoadingAction {
  type: ProductsActionTypes.LOADING;
}

export interface ProductsGetSingleAction {
  type: ProductsActionTypes.GETSINGLE;
  product: Product;
}

export interface ProductsState {
  readonly products: Product[];
  readonly productsLoading: boolean;
  readonly currentProduct: Product | null;
}

export type ProductsActions =
  | ProductsGetAllAction
  | ProductsGetSingleAction
  | ProductsLoadingAction;
