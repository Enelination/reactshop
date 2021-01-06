import { ActionCreator, AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import {
  getProduct as getProductFromAPI,
  getProducts as getProductsFromAPI
} from "../../data/ProductsData";
import {
  ProductsLoadingAction,
  ProductsActionTypes,
  ProductsState,
  ProductsGetAllAction,
  ProductsGetSingleAction
} from "./ProductsTypes";

const loading: ActionCreator<ProductsLoadingAction> = () => {
  return {
    type: ProductsActionTypes.LOADING
  };
};

export const getProducts: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  ProductsState,
  null,
  ProductsGetAllAction
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loading());
    const products = await getProductsFromAPI();
    return dispatch({
      products,
      type: ProductsActionTypes.GETALL
    });
  };
};

export const getProduct: ActionCreator<ThunkAction<
  Promise<any>,
  ProductsState,
  null,
  ProductsGetSingleAction
>> = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loading());
    const product = await getProductFromAPI(id);
    dispatch({
      product,
      type: ProductsActionTypes.GETSINGLE
    });
  };
};
