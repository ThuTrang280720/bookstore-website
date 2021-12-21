import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { Delete } from "@mui/icons-material";
import "./listcart.css";
import Loading from "../../../utils/loading/Loading";
import axiosClient from "../../../api/ClientAxiosApi";

function ListCart() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [cart, setCart] = state.userApi.cart;

  //Check null
  if (cart.length === 0)
    return (
      <>
        <h2 style={{ textAlign: "center", fontSize: "5rem" }}>
          Cart empty
          {<Loading />}
        </h2>
      </>
    );
  //action button count
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    updateCart(cart);
  };
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    updateCart(cart);
  };

  //Delete cartItem
  const removeCartItem = (id) => {
    if (window.confirm("Are you sure, product will remove from your Cart"))
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
    setCart([...cart]);
    updateCart(cart);
  };

  //Update DB
  const updateCart = async (cart) => {
    await axiosClient.patch(
      "/user/addtocart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  return (
    <>
      <div className="list_container">
        {cart.map((product) => (
          <div className="listcart" key={product._id}>
            <img src={product.images.url} alt="" className="img_container" />
            <div className="listcart-detail">
              <div className="row">
                <h2>{product.title}</h2>
                <h6>#{product.product_id}</h6>
              </div>
              <span>${product.price}</span>
              <p>Tác giả: {product.author}</p>
              <p>NXB: {product.publisher}</p>
              <p>Đã mua: {product.sold}</p>
            </div>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span> {product.quantity} </span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div className="delete" onClick={() => removeCartItem(product._id)}>
              <Delete />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListCart;
