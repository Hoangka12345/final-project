import React, { useContext, useEffect, useState } from "react";

import styles from "./History.module.scss";
import classNames from "classnames/bind";

import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";
import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import request from "../../../../Utils/request";
import HistoryTable from "./HistoryTable";

const cx = classNames.bind(styles);

const History = () => {
  // --------state----------
  const [bookings, setBookings] = useState([]);

  // --------context-------
  const { loading } = useContext(LoadingContext);

  // --------get all of bookings-------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("booking/show");
        if (res.status === 200) {
          setBookings(res.data.bookings);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return loading ? (
    <Progress />
  ) : (
    <>
      <Header />

      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <HistoryTable bookings={bookings} />
        </div>
      </div>

      <div className={cx("author")}>
        Created By
        <span> Mr.Hoang </span>| Hoangpbgch190102@fpt.edu.vn
      </div>
    </>
  );
};

export default History;
