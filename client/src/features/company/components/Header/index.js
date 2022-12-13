import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Avatar } from "@mui/material";

import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import Logo from "../../../../assets/logo.png";
import Menu from "./Menu";

import request from "../../../../Utils/request";
import { URL_AVT } from "../../../../components/Constants";

const cx = classNames.bind(styles);

function Header(props) {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({});

  const [cookie, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const getCompanyInfo = async () => {
      if (cookie["token"]) {
        try {
          const res = await request.get("/company");
          if (res.status === 200) {
            setCompanyInfo(res.data.user);
          }
        } catch (error) {
          return;
        }
      } else return;
    };

    getCompanyInfo();
  }, []);

  return (
    <header className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("logo")} onClick={() => navigate("/company")}>
          <img src={Logo} alt="" />
        </div>
        <div className={cx("content")}>
          <div className={cx("content-item")} onClick={() => navigate("/company/create")}>
            Create new Tour
          </div>
          <div className={cx("content-item")} onClick={() => navigate("/company/dashboard")}>
            Dashboard
          </div>
          <div className={cx("content-item")} onClick={() => navigate("/company/history")}>
            Tour Booking History
          </div>
        </div>
        <div className={cx("company-info")}>
          <div className={cx("avatar")}>
            <img src={companyInfo.avatar && `${URL_AVT}/${companyInfo.avatar}`} alt="" />
          </div>
          <p>{companyInfo.username ? companyInfo.username : ""}</p>
          <Menu setCompanyInfo={setCompanyInfo} />
        </div>
      </div>
    </header>
  );
}

export default Header;
