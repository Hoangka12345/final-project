import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BusinessIcon from "@mui/icons-material/Business";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

import styles from "./MenuList.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const classesIcon = {
  fontSize: "3rem",
  color: "#d7d7d7",
  width: "15%",
};

function MenuList(props) {
  // ----------------router-dom----------
  const navigate = useNavigate();
  const location = useLocation();

  // --------useMemo----------
  const active = useMemo(() => {
    const path = location.pathname.split("/")[2];
    return path;
  }, [location.pathname]);

  // --------handle navigation --------
  const handleNavigate = (path) => {
    navigate(`/admin/${path}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("menu-icon")}>
        <MenuIcon sx={{ mr: 2, fontSize: "3rem", color: "#fff" }} />
      </div>

      <div className={cx("menu-list")}>
        <div className={active == "user" ? cx("menu-item", "active") : cx("menu-item")}>
          <ManageAccountsIcon sx={classesIcon} />
          <span className={cx("item-content")} onClick={() => handleNavigate("user")}>
            User's accounts
          </span>
        </div>

        <div className={active == "company" ? cx("menu-item", "active") : cx("menu-item")}>
          <BusinessIcon sx={classesIcon} />
          <span className={cx("item-content")} onClick={() => handleNavigate("company")}>
            Company's accounts
          </span>
        </div>

        <div className={active == "verify-company" ? cx("menu-item", "active") : cx("menu-item")}>
          <DoneAllIcon sx={classesIcon} />
          <span className={cx("item-content")} onClick={() => handleNavigate("verify-company")}>
            Verified accounts
          </span>
        </div>

        <div className={active == "unverify-company" ? cx("menu-item", "active") : cx("menu-item")}>
          <HourglassTopIcon sx={classesIcon} />
          <span className={cx("item-content")} onClick={() => handleNavigate("unverify-company")}>
            Unverify accounts
          </span>
        </div>

        <div className={active == "booking" ? cx("menu-item", "active") : cx("menu-item")}>
          <AirplaneTicketIcon sx={classesIcon} />
          <span className={cx("item-content")} onClick={() => handleNavigate("booking")}>
            Manager bookings
          </span>
        </div>

        <div className={active == "dashboard" ? cx("menu-item", "active") : cx("menu-item")}>
          <AttachMoneyOutlinedIcon sx={classesIcon} />
          <span className={cx("item-content")} onClick={() => handleNavigate("dashboard")}>
            Income dashboard
          </span>
        </div>
      </div>
    </div>
  );
}

export default MenuList;
