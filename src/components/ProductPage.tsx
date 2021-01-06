import * as React from "react";
import { RouteComponentProps, useParams, Prompt } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Product } from "../data/ProductsData";
import ProductComponent from "./ProductComponent";
import { addToBasket } from "../state/basket/BasketActions";
import { getProduct } from "../state/products/ProductsActions";
import { ApplicationState } from "../state/Store";

type Props = RouteComponentProps<{ id: string }>;

const ProductPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const { product, loading, added } = useSelector(
    (state: ApplicationState) => ({
      product: state.products.currentProduct,
      added: state.basket.products.some(p =>
        state.products.currentProduct
          ? p.id === state.products.currentProduct.id
          : false
      ),
      loading: state.products.productsLoading
    })
  );

  const add = (product: Product) => {
    dispatch(addToBasket(product));
  };

  const get = (id: number) => {
    dispatch(getProduct(id));
  };

  React.useEffect(() => {
    if (params.id) {
      const id: number = parseInt(params.id, 10);
      get(id);
    }
  }, [params.id]);

  const handleAddClick = () => {
    product && add(product);
  };

  const navAwayMessage = () =>
    "Are you sure you leave without buying this product?";

  return (
    <div className="page-container">
      <Prompt when={!added} message={navAwayMessage} />
      {product || loading ? (
        <ProductComponent
          loading={loading}
          product={product || undefined}
          inBasket={added}
          onAddToBasket={handleAddClick}
        />
      ) : (
        <p>Product not found!</p>
      )}
    </div>
  );
};

export default ProductPage;
