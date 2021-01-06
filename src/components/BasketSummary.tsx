import * as React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../state/Store";

//import "./BasketSummary.css";

const BasketSummary: React.FC = () => {
  const count = useSelector(
    (state: ApplicationState) => state.basket.products.length
  );
  return <div className="basket-summary">{count}</div>;
};

export default BasketSummary;
