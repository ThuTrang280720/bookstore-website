import React, { useContext } from "react";
import dateFormat from "dateformat";
import { GlobalState } from "../../../GlobalState";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Order() {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [orderInfo] = state.userApi.orderInfo;
  if (orderInfo.length > 10) {
    toast("You have become a vip member. Thanks you");
  }
  const handleToDetail = (id) => {
    history.push(`/order/${id}`);
  };

  return (
    <div className="orderlist">
      <div className="orderListTitle">
        <h4>You have {orderInfo.length} ordered</h4>
        {/* <Link to="/createUser">
          <button className="userAddButton">Create User</button>
        </Link> */}
      </div>
      <div className="ordersList">
        <table className="orderListOrder">
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Address</th>
              <th>Option</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderInfo.map((order) => (
              <tr key={order._id}>
                <td onClick={() => handleToDetail(order._id)}>
                  {order.orderID}
                </td>
                <td onClick={() => handleToDetail(order._id)}>{order.email}</td>
                <td onClick={() => handleToDetail(order._id)}>{order.name}</td>
                <td onClick={() => handleToDetail(order._id)}>
                  {Object.values(order.address)}
                </td>
                <td onClick={() => handleToDetail(order._id)}>
                  {order.option.type}
                </td>
                <td onClick={() => handleToDetail(order._id)}>
                  {dateFormat(order.createdAt)}
                </td>
                <td>
                  <select
                    className={
                      order.status === 5
                        ? "checked_order"
                        : order.status === 3
                        ? "delay_order"
                        : order.status === 1
                        ? "cancel_order"
                        : null
                    }
                    name="status"
                    value={order.status}
                    // onChange={(e) =>
                    //   handleChangeStatus(order._id, e.target.value)
                    // }
                    disabled
                  >
                    <option value={0} disabled>
                      Chờ xác nhận
                    </option>
                    <option value={1} disabled>
                      Đã huỷ
                    </option>
                    <option value={2} disabled>
                      Đã xác nhận
                    </option>
                    <option value={3} disabled>
                      Tạm hoãn
                    </option>
                    <option value={4} disabled>
                      Đã giao hàng
                    </option>
                    <option value={5} disabled>
                      Đã thanh toán
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
