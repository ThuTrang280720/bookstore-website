import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { GlobalState } from "../../../GlobalState";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../../api/ClientAxiosApi";

export default function OrderDetail() {
  const params = useParams();
  const history = useHistory();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [orderInfo] = state.userApi.orderInfo;
  const [callback, setCallback] = state.userApi.callback;
  const [orderInfoDetail, setOrderInfoDetail] = useState([]);

  useEffect(() => {
    if (params.id) {
      orderInfo.forEach((item) => {
        if (item._id === params.id) setOrderInfoDetail(item);
      });
    }
  }, [params.id, orderInfo]);
  console.log(orderInfoDetail);

  const handleCancelOrder = async (id) => {
    try {
      if (orderInfoDetail.status !== 0) {
        return toast.success(
          "The order has been approved by the administrator."
        );
      }
      document.body.classList.add("loading-data");
      if (
        window.confirm(
          "Are you sure cancel this order?. This action cannot be undone!"
        )
      ) {
        const res = await axiosClient.patch(
          `/user/order_infor/${id}`,
          { status: 1 },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
        history.push("/order");
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    document.body.classList.remove("loading-data");
  };

  if (orderInfoDetail.length === 0) return null;
  return (
    <div>
      <div className="userListTitle">
        <h4>
          Order {orderInfoDetail.orderID} has {orderInfoDetail.cart.length}
          ordered
        </h4>
        {orderInfoDetail.status === 0 ? (
          <button
            className="orderCancelButton"
            onClick={() => handleCancelOrder(orderInfoDetail._id)}
          >
            Cancel order
          </button>
        ) : null}
      </div>
      <div className="usersList">
        <table className="userListUser">
          <thead>
            <tr>
              <th>ProductID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Kim Đồng</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {orderInfoDetail.cart.map((item) => (
              <tr key={item._id}>
                <td>{item.product_id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.publisher}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <img src={item.images.url} alt="" height="140px" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
