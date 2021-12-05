import React, { useContext } from "react";
import "./userlist.css";
import { GlobalState } from "../../../../GlobalState";

import Loading from "../../../../utils/loading/Loading";
import { DeleteForever, Edit, Search } from "@material-ui/icons";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../../../api/ClientAxiosApi";
import withLoading from "../../../../utils/loading/withLoading";

function UserList(props) {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [inforAll] = state.userApi.inforAll;
  const [callback, setCallback] = state.userApi.callback;
  //filter
  const [, setPage] = state.userApi.page;
  const [search, setSearch] = state.userApi.search;
  const [sort, setSort] = state.userApi.sort;
  const [role, setRole] = state.userApi.role;
  const [countPage] = state.userApi.countPage;
  const [limit, setLimit] = state.userApi.limit;
  const [result] = state.userApi.result;
  const [totalResult] = state.userApi.totalResult;

  const deleteSubmit = async (id, email) => {
    // e.preventDefault();
    props.showLoading();
    try {
      console.log(id, email);
      if (window.confirm(`Are you sure delete user ${email}?`)) {
        const result = await axiosClient.delete(`/user/delete/${id}`, {
          headers: { Authorization: token },
        });
        setCallback(!callback);
        toast.success(result.data.msg);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    props.hideLoading();
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
    setSearch("");
  };
  return (
    <>
      <div className="userlist">
        <div className="userListTitle">
          <h4>List user in Database</h4>
          <Link to="/admin/createUser">
            <button className="userAddButton">Create User</button>
          </Link>
        </div>
        <div className="userList_toolbar_wrapper">
          <div className="select_account">
            <span>Filters: </span>
            <select name="Role" value={role} onChange={handleRole}>
              <option value={"role[gte]=" + 0}>All Account</option>
              <option value={"role[eq]=" + 0}>User Account</option>
              <option value={"role[eq]=" + 1}>Admin Account</option>
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
              <option value={8}>x8</option>
              <option value={6}>x6</option>
            </select>
          </div>
          <div className="sort_select">
            <span>Sort By: </span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Date ⩣</option>
              <option value="sort=oldest">Date ⩠</option>
              <option value="sort=-sold">Potential customers</option>
              <option value="sort=-role">Hight-Low</option>
              <option value="sort=role">Low-Hight</option>
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

        <div className="usersList">
          <table className="userListUser">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inforAll.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.role === 0 ? "User Account" : "Admin Account"}</td>
                  <td>
                    <Link to={`/admin/userdetail/${user._id}`}>
                      <Edit className="userListEdit" />
                    </Link>

                    <DeleteForever
                      className="userListDelete"
                      onClick={() => deleteSubmit(user._id, user.email)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {inforAll.length === 0 && <Loading />}
        <div className="pagination-container">
          <div className="pagination">
            <Pagination
              count={countPage}
              siblingCount={0}
              // boundaryCount={1}
              color="primary"
              onChange={handlePageChange}
            />
          </div>
        </div>
        {/* <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div> */}
      </div>
    </>
  );
}

export default withLoading(UserList);
