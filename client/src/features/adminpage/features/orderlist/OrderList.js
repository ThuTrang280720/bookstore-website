import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import "./orderlist.css";
import dateFormat from "dateformat";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../../../api/ClientAxiosApi";
import { Search } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import Loading from "../../../../utils/loading/Loading";

export default function OrderList() {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [orderList] = state.OrdersApi.orderList;
  const [callback, setCallback] = state.OrdersApi.callback;

  //filter
  const [search, setSearch] = state.OrdersApi.search;
  const [sort, setSort] = state.OrdersApi.sort;
  const [status, setStatus] = state.OrdersApi.status;
  const [countPage] = state.OrdersApi.countPage;
  const [limit, setLimit] = state.OrdersApi.limit;
  const [page, setPage] = state.OrdersApi.page;
  const [result] = state.OrdersApi.result;
  const [totalResult] = state.OrdersApi.totalResult;

  const handleChangeStatus = async (id, status) => {
    try {
      console.log(id, status);
      const res = await axiosClient.patch(
        `/api/order/${id}`,
        {
          status: status,
        },
        {
          headers: { Authorization: token },
        }
      );
      setCallback(!callback);
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  const handleToDetail = (id) => {
    history.push(`/admin/orderlistdetail/${id}`);
  };
  const handleOrdersFilter = (e) => {
    setStatus(e.target.value);
    setSearch("");
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="orderlist">
      <div className="orderListTitle">
        <h4>System have {orderList.length} ordered</h4>
      </div>
      <div className="userList_toolbar_wrapper">
        <div className="select_account">
          <span>Filters: </span>

          <select name="status" value={status} onChange={handleOrdersFilter}>
            <option value={"status[gte]=" + 0}>All Orders</option>
            <option value={"status[eq]=" + 0}>Chờ xác nhận</option>
            <option value={"status[eq]=" + 1}>Đã huỷ</option>
            <option value={"status[eq]=" + 2}>Đã xác nhận</option>
            <option value={"status[eq]=" + 3}>Tạm hoãn</option>
            <option value={"status[eq]=" + 4}>Đã giao hàng</option>
            <option value={"status[eq]=" + 5}>Đã thanh toán</option>
          </select>
        </div>
        <div className="search_input">
          {/* <span>Tools</span> */}
          <Search />
          <input
            type="text"
            value={search}
            placeholder="Enter your search!"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="select_output">
          <span>Open: </span>
          <select value={limit} onChange={(e) => setLimit(e.target.value)}>
            <option value={10}>x10</option>
            <option value={20}>x20</option>
            <option value={40}>x40</option>
          </select>
        </div>
        <div className="sort_select">
          <span>Sort By: </span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Lasted</option>
            <option value="sort=oldest">Oldest</option>
            <option value="sort=email">Best Seller</option>
          </select>
        </div>
      </div>
      <div className="userlist_result">
        <div className="result_account">
          <span>
            Having
            <i>
              {result} of {result}
            </i>
            Account
          </span>
        </div>
        <div></div>
        <div>
          <span>
            Showing
            <i>
              1-{result} of {totalResult}
            </i>
            result
          </span>
        </div>
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
            {orderList.map((order) => (
              <tr key={order._id}>
                {/* <Link
                  to={`/admin/orderlistdetail/${order._id}`}
                  key={order._id}
                > */}
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
                    onChange={(e) =>
                      handleChangeStatus(order._id, e.target.value)
                    }
                    disabled={order.status === 1 || order.status === 5}
                  >
                    <option value={0}>Chờ xác nhận</option>
                    <option value={1}>Đã huỷ</option>
                    <option value={2}>Đã xác nhận</option>
                    <option value={3}>Tạm hoãn</option>
                    <option value={4}>Đã giao hàng</option>
                    <option value={5}>Đã thanh toán</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orderList.length === 0 && <Loading />}
      <div className="pagination-container">
        <div className="pagination">
          <Pagination
            page={page}
            count={countPage}
            siblingCount={0}
            // boundaryCount={1}
            color="primary"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
