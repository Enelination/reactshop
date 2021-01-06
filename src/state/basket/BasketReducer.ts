import { Reducer } from "redux";
import { BasketActions, BasketActionTypes, BasketState } from "./BasketTypes";

const initialBasketState: BasketState = {
  products: []
};

export const basketReducer: Reducer<BasketState, BasketActions> = (
  state = initialBasketState,
  action
) => {
  switch (action.type) {
    case BasketActionTypes.ADD: {
      return {
        ...state,
        products: state.products.concat(action.product)
      };
    }
    default:
      return state;
  }
};
