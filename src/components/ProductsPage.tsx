import * as React from "react";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "url-search-params-polyfill";

import "./ProductsPage.css";
import { getProducts } from "../state/products/ProductsActions";
import { ApplicationState } from "../state/Store";
import ProductsList from "./ProductsList";

const ProductsPage: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const { products, productsLoading } = useSelector(
    (state: ApplicationState) => state.products
  );
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="page-container">
      <p>Welcome to React Shop where you can get all your tools for ReactJS!</p>
      <ProductsList
        loading={productsLoading}
        products={products}
        search={search}
      />
    </div>
  );
};

export default ProductsPage;
