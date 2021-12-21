import { AddShoppingCart } from "@mui/icons-material";
import { Rating } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Footers from "../../../components/footers/Footers";
import Shipping from "../../../components/shipping/Shipping";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../productItem/ProductItem";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);

  const [products] = state.productsApi.products;

  const [detailProduct, setDetailProduct] = useState([]);
  const addCart = state.userApi.addCart;
  const [onLoad, setOnLoad] = useState(false);
  const [quantityAmount, setQuantityAmount] = useState(1);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setDetailProduct(product);
        }
      });
    }
  }, [params, products]);

  // const increment = (id) => {
  //   cart.forEach((item) => {
  //     if (item._id === id) {
  //       item.quantity += 1;
  //     }
  //   });
  //   setCart([...cart]);
  //   updateCart(cart);
  // };
  // const decrement = (id) => {
  //   cart.forEach((item) => {
  //     if (item._id === id) {
  //       item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
  //     }
  //   });
  //   setCart([...cart]);
  //   updateCart(cart);
  // };

  // const updateCart = async (cart) => {
  //   await axiosClient.patch(
  //     "/user/addtocart",
  //     { cart },
  //     {
  //       headers: { Authorization: token },
  //     }
  //   );
  // };
  const loadMore = () => {
    setOnLoad(!onLoad);
    console.log(onLoad);
  };
  const handleScrollTop = () => {
    window.scrollTo({
      top: 130,
      behavior: "smooth",
    });
    setOnLoad(false);
  };
  if (detailProduct.length === 0) return null;
  return (
    <>
      <div>
        <div className="detail">
          <img src={detailProduct.images.url} alt="" />
          <div className="split-detail"></div>
          <div className="box-detail">
            <div className="row">
              <h2>{detailProduct.title}</h2>
              {/* <h4>{detailProduct.author}</h4>
                  <h4>{detailProduct.publisher}</h4> */}
              <h6>#{detailProduct.product_id}</h6>
            </div>
            <span>${detailProduct.price}</span>
            <p className="title_description_split">
              Mô tả: <br />
              {detailProduct.description}
            </p>
            {/* <p>Nội dung: {detailProduct.content}</p> */}
            <p>Thể loại: {detailProduct.category}</p>
            <p>Tác giả: {detailProduct.author}</p>
            <p>NXB: {detailProduct.publisher}</p>
            <p>Sold: {detailProduct.sold}</p>
            {/* <div className="amount">
              <button onClick={() => decrement(detailProduct._id)}> - </button>
              <span>1 {detailProduct.quantity} </span>
              <button onClick={() => increment(detailProduct._id)}> + </button>
            </div> */}
            <div className="quantity-box">
              <div className="quantity-col1">
                <div className="quantity-amount">
                  <button
                    onClick={
                      quantityAmount !== 1
                        ? () => setQuantityAmount(quantityAmount - 1)
                        : null
                    }
                  >
                    {" "}
                    -{" "}
                  </button>
                  <input type="text" value={quantityAmount} />
                  <button onClick={() => setQuantityAmount(quantityAmount + 1)}>
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
              <Link
                to="#"
                className="cart"
                onClick={() => addCart(detailProduct, quantityAmount)}
              >
                Add to cart <AddShoppingCart />
              </Link>
            </div>
          </div>
        </div>
        <div className="detail-info">
          <div className="product_content">
            <div className="container">
              <h2 className="title_content">Nội dung</h2>
              <div className={`box_content ${onLoad ? "cYhiAl" : "jpFMBi"}`}>
                <p className="title_content_split">{detailProduct.content}</p>
                {onLoad ? null : <div className="gradient"></div>}
              </div>
              <button className="btn-more" onClick={loadMore}>
                {onLoad ? "Rút gọn" : "Xem thêm"}
              </button>
            </div>
          </div>
          <div className="product_rate">
            <div className="product_rate_title">
              <h2>Đánh giá sản phẩm</h2>
            </div>
            <div className="review-rating">
              <div className="review-rating-summary">
                <div className="review-rating-point">4.7</div>
                <div className="review-rating-starts">
                  <div className="count-starts">
                    <Rating precision={0.5} />
                  </div>
                  <div className="review-rating-total">10 nhận xét</div>
                </div>
              </div>
              <div className="review-rating-detail">
                <div className="review-rating-level">
                  <Rating
                    name="size-small"
                    defaultValue={5}
                    size="small"
                    readOnly
                  />

                  <div className="count-comments"></div>
                </div>
                <div className="review-rating-level">
                  <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                  />

                  <div className="count-comments"></div>
                </div>
                <div className="review-rating-level">
                  <Rating defaultValue={3} size="small" readOnly />

                  <div className="count-comments"></div>
                </div>
                <div className="review-rating-level">
                  <Rating defaultValue={2} size="small" readOnly />

                  <div className="count-comments"></div>
                </div>
                <div className="review-rating-level">
                  <Rating defaultValue={1} size="small" readOnly />

                  <div className="count-comments"></div>
                </div>
              </div>
            </div>
            <div className="review-comments-user">
              <div className="product_rate_title">
                <h3>Nhận xét</h3>
              </div>
              <div className="comments-user">
                <div className="comment-info">
                  <div className="name">Chuan</div>
                  <div className="rating">
                    <Rating defaultValue={2} size="small" readOnly />
                  </div>
                </div>
                <div className="comment-content">
                  <p>
                    Chưa đọc thử nhưng thấy shop đóng gói khá kĩ càng. Sách đẹp,
                    không méo mó. Sẽ ủng hộ tiếp!
                  </p>
                </div>
              </div>
              <div className="comments-user">
                <div className="comment-info">
                  <div className="name">Chuan</div>
                  <div className="rating">
                    <Rating defaultValue={2} size="small" readOnly />
                  </div>
                </div>
                <div className="comment-content">
                  <p>
                    Chưa đọc thử nhưng thấy shop đóng gói khá kĩ càng. Sách đẹp,
                    không méo mó. Sẽ ủng hộ tiếp!
                  </p>
                </div>
              </div>
              <div className="comments-user">
                <div className="comment-info">
                  <div className="name">Chuan</div>
                  <div className="rating">
                    <Rating defaultValue={2} size="small" readOnly />
                  </div>
                </div>
                <div className="comment-content">
                  <p>
                    Chưa đọc thử nhưng thấy shop đóng gói khá kĩ càng. Sách đẹp,
                    không méo mó. Sẽ ủng hộ tiếp!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="related_products">
        <div className="container">
          <div className="related_title">
            <h2>Related products</h2>
          </div>

          <div className="products">
            {products.map((product) => {
              return product.category === detailProduct.category ? (
                <Link
                  to={`/detail/${product._id}`}
                  onClick={() => handleScrollTop()}
                >
                  <ProductItem key={product._id} product={product} />
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </div>
      <Shipping />
      <Footers />
    </>
  );
}

export default DetailProduct;
