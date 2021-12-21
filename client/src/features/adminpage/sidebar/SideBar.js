import React from "react";
import "./sidebar.css";
import {
  AccountCircle,
  Book,
  BorderColor,
  CalendarToday,
  HourglassEmpty,
  FeedbackOutlined,
  LineStyle,
  MailOutline,
  QuestionAnswerOutlined,
  Timeline,
  TrendingUp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/userlist">
              <li className="sidebarListItem">
                <AccountCircle className="sidebarIcon" />
                Accounts
              </li>
            </Link>
            <Link to="/admin/productlist">
              <li className="sidebarListItem">
                <Book className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/admin/categorieslist">
              <li className="sidebarListItem">
                <CalendarToday className="sidebarIcon" /> Categories
              </li>
            </Link>
            <Link to="/admin/orderlist">
              <li className="sidebarListItem">
                <BorderColor className="sidebarIcon" /> Orders
              </li>
            </Link>
            <li className="sidebarListItem">
              <CalendarToday className="sidebarIcon" /> Logs
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notification</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" /> Email
            </li>
            <li className="sidebarListItem">
              <FeedbackOutlined className="sidebarIcon" /> Feedback
            </li>
            <li className="sidebarListItem">
              <QuestionAnswerOutlined className="sidebarIcon" /> Messages
            </li>
            <li className="sidebarListItem">
              <HourglassEmpty className="sidebarIcon" /> About
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Marketing</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <LineStyle /> Analytics
            </li>
            <li className="sidebarListItem">
              <Timeline /> Products
            </li>
            <li className="sidebarListItem">
              <TrendingUp /> Orders
            </li>
            <li className="sidebarListItem">
              <HourglassEmpty /> Logs
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
