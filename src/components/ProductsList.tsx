import * as React from "react";

import { Product } from "../data/ProductsData";
import { Link } from "react-router-dom";
import withLoader from "./withLoader";

interface Props {
  loading: boolean;
  products: Product[];
  search: string;
}

const ProductsList: React.FC<Props> = props => {
  const { search, products } = props;
  return (
    <ul className="product-list">
      {products.map(product => {
        if (
          !search ||
          (search &&
            product.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        ) {
          return (
            <li key={product.id} className="product-list-item">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
  );
};

export default withLoader(ProductsList);
