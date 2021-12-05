import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { GlobalState } from "../../../../GlobalState";
export default function OrderDetailAdmin() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [orderList] = state.OrdersApi.orderList;
  const [orderListDetail, setOrderListDetail] = useState([]);

  useEffect(() => {
    if (params.id) {
      orderList.forEach((item) => {
        if (item._id === params.id) setOrderListDetail(item);
      });
    }
  }, [params.id, orderList]);
  console.log(orderListDetail);

  if (orderListDetail.length === 0) return null;
  return (
    <div className="orderlist">
      <div className="orderListTitle">
        <h4>Account have {orderListDetail.cart.length} ordered</h4>
        {/* <Link to="/createUser">
    <button className="userAddButton">Create User</button>
  </Link> */}
      </div>
      <div className="ordersList">
        <table className="orderListOrder">
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
            {orderListDetail.cart.map((item) => (
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
