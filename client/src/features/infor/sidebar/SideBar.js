import React, { useContext } from "react";
import "./sidebar.css";
import { AccountCircle, BorderColor, CalendarToday } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
export default function SideBar() {
  const state = useContext(GlobalState);
  const [infor] = state.userApi.infor;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">{infor.name}</h3>
          <ul className="sidebarList">
            <Link to="/infor">
              <li className="sidebarListItem">
                <AccountCircle className="sidebarIcon" />
                Information
              </li>
            </Link>
            <Link to="/order">
              <li className="sidebarListItem">
                <BorderColor className="sidebarIcon" />
                Order History
              </li>
            </Link>
            <li className="sidebarListItem">
              <BorderColor className="sidebarIcon" /> Logout
            </li>
            <li className="sidebarListItem">
              <CalendarToday className="sidebarIcon" /> Logs
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
