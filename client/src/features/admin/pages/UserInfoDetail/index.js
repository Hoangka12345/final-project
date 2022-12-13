import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { Paper } from "@mui/material";

import styles from "./UserInfoDetail.module.scss";
import classNames from "classnames/bind";

import Layout from "../../components/Layout";
import Actions from "./Actions";
import request from "../../../../Utils/request";
import { URL_AVT } from "../../../../components/Constants";

const cx = classNames.bind(styles);

function UserInfoDetail(props) {
  // --------state----------
  const [user, setUser] = useState({});

  // --------router-dom----------
  const location = useLocation();

  // --------useRed----------
  const params = useRef(queryString.parse(location.search)._id);

  // --------call api get user info --------------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get(`/admin/user/showuserdetail/${params.current}`);
        if (res.status === 200) {
          setUser(res.data.user[0]);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <Layout>
      <div className={cx("wrapper")}>
        <Paper sx={{ width: "100%", height: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
          <div className={cx("container")}>
            <div className={cx("avatar")}>
              <img
                src={
                  user.avatar
                    ? `${URL_AVT}/${user.avatar}`
                    : "https://qph.cf2.quoracdn.net/main-qimg-9f2469505de3ed568ef66f87e8aa9ebd-lq"
                }
                alt=""
              />
            </div>
            <div className={cx("user-info")}>
              <div className={cx("main-info")}>
                <div className={cx("title")}>User name</div>
                <div className={cx("content")}>{user.username && user.username}</div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Email</div>
                <div className={cx("content")}>{user.email && user.email}</div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Phone number</div>
                <div className={cx("content")}>{user.phoneNumber && user.phoneNumber}</div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Number of tours booked</div>
                <div className={cx("content")}>{user.booked && user.booked.length}</div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Success rate of tour</div>
                <div className={cx("content")}>100%</div>
              </div>
              <div className={cx("main-info")}>
                <Actions user={user} />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </Layout>
  );
}

export default UserInfoDetail;
