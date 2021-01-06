import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";

import { productsReducer } from "./products/ProductsReducer";
import { ProductsState } from "./products/ProductsTypes";
import { BasketState } from "./basket/BasketTypes";
import { basketReducer } from "./basket/BasketReducer";

export interface ApplicationState {
  products: ProductsState;
  basket: BasketState;
}

const rootReducer = combineReducers<ApplicationState>({
  products: productsReducer,
  basket: basketReducer
});

export default function configureStore(): Store<ApplicationState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
