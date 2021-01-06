import * as React from "react";
import { Product } from "../data/ProductsData";

import "./ProductPage.css";
import Tabs from "./Tabs";
import withLoader from "./withLoader";

interface Props {
  product?: Product;
  inBasket: boolean;
  onAddToBasket: () => void;
}

interface LikeState {
  likes: number;
  lastLike: Date | null;
}

const initialLikeState: LikeState = {
  likes: 0,
  lastLike: null
};

enum LikeActionTypes {
  LIKE = "LIKE"
}

interface LikeAction {
  type: LikeActionTypes.LIKE;
  now: Date;
}

type LikeActions = LikeAction;

const reducer = (state: LikeState = initialLikeState, action: LikeActions) => {
  switch (action.type) {
    case LikeActionTypes.LIKE:
      return { ...state, likes: state.likes + 1, lastLike: action.now };
  }
  return state;
};

const ProductComponent: React.FC<Props> = props => {
  const product = props.product;

  const handleAddClick = () => {
    props.onAddToBasket();
  };

  const [{ likes, lastLike }, dispatch]: [
    LikeState,
    (action: LikeAction) => void
  ] = React.useReducer(reducer, initialLikeState);

  const handleLikeClick = () => {
    dispatch({ type: LikeActionTypes.LIKE, now: new Date() });
  };

  return !product ? null : (
    <React.Fragment>
      <h1>{product.name}</h1>
      <Tabs>
        <Tabs.Tab
          name="Description"
          initialActive={true}
          heading={() => <b>Description</b>}
        >
          <p>{product.description}</p>
        </Tabs.Tab>
        <Tabs.Tab name="Reviews" heading={() => <b>Reviews</b>}>
          <ul className="product-reviews">
            {product.reviews.map(review => (
              <li key={review.reviewer}>
                <i>"{review.comment}"</i> - {review.reviewer}
              </li>
            ))}
          </ul>
        </Tabs.Tab>
      </Tabs>
      <p className="product-price">
        {new Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency"
        }).format(product.price)}
      </p>
      {!props.inBasket && (
        <button onClick={handleAddClick}>Add to basket</button>
      )}
      <div className="like-container">
        {likes > 0 && (
          <div>{`I like this x ${likes}, last at ${lastLike}`}</div>
        )}
        <button onClick={handleLikeClick}>
          {likes > 0 ? "Like again" : "Like"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default withLoader(ProductComponent);
