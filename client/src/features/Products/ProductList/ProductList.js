import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../productItem/ProductItem";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductList() {
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  const [loadSklt] = state.productsApi.loadSklt;

  // const [isAdmin] = state.userApi.isAdmin

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await axios.get("/api/products");
  //     setProducts(res.data.products);
  //   };
  //   getProducts();
  // }, [setProducts]);

  return (
    <>
      <div className="products">
        {loadSklt ? (
          <div className="product_skeleton">
            <SkeletonTheme color="#ddd" highlightColor="#fff">
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
              <div className="product_card_skeleton">
                <Skeleton width={276} height={369.2} />
              </div>
            </SkeletonTheme>
          </div>
        ) : products.length !== 0 ? (
          products.map((product) => {
            return (
              <Link to={`detail/${product._id}`} key={product._id}>
                <ProductItem key={product._id} product={product} />
              </Link>
            );
          })
        ) : (
          <h2>Sorry, No product found </h2>
        )}
      </div>
    </>
  );
}

export default ProductList;
