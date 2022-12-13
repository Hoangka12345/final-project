import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";

import { Paper } from "@mui/material";

import styles from "./BookingDetail.module.scss";
import classNames from "classnames/bind";

import Layout from "../../components/Layout";
import request from "../../../../Utils/request";

const cx = classNames.bind(styles);

const BookingDetailPage = () => {
  // --------state----------
  const [booking, setBooking] = useState({});

  // --------router-dom----------
  const location = useLocation();

  // --------memo----------
  const bookingId = useMemo(() => {
    return queryString.parse(location.search)._id;
  }, [location.search]);

  const duration = useMemo(() => {
    return moment
      .duration(moment(booking.timeOut, "MM-DD-YYYY").diff(moment(booking.timeStart, "MM-DD-YYYY")))
      .asDays();
  }, [booking.timeStart]);

  // --------call api to get booking's info-------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("admin/booking/show");
        if (res.status === 200) {
          const data = res.data.bookings.filter((booking) => bookingId === booking._id)[0];
          console.log(data);
          if (data) {
            setBooking(data);
          }
        }
      } catch (error) {}
    })();
  }, [bookingId]);

  return (
    <Layout>
      <div className={cx("wrapper")}>
        <Paper
          sx={{
            width: "90%",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: "2rem 1rem 8rem",
          }}
        >
          <h2>Booking's information</h2>
          <div className={cx("main_content")}>
            <div className={cx("content")}>
              <div className={cx("info")}>
                <span>name of tour:</span>
                <span>{booking.tour && booking.tour[0].title}</span>
              </div>
              <div className={cx("info")}>
                <span>Duration:</span>
                <span>{duration}</span>
                <span>{duration > 1 ? "days" : "day"}</span>
              </div>
              <div className={cx("info")}>
                <span>Departure day:</span>
                <span>{booking.timeStart && booking.timeStart}</span>
              </div>
              <div className={cx("info")}>
                <span>End date:</span>
                <span>{booking.timeOut && booking.timeOut}</span>
              </div>
              <div className={cx("info")}>
                <span>Booking date:</span>
                <span>{booking.createdAt && moment(booking.createdAt).format("MM-DD-YYYY")}</span>
              </div>
              <div className={cx("info")}>
                <span>price of tour:</span>
                <span>
                  {booking.price &&
                    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      booking.price / booking.numberTicket
                    )}
                </span>
              </div>
            </div>
            <div className={cx("content")}>
              <div className={cx("info_user")}>
                <span>Customer's name:</span>
                <span>{booking.user && booking.user[0].username}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Customer's email:</span>
                <span>{booking.user && booking.user[0].email}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Customer's number:</span>
                <span>{booking.phoneNumber && booking.phoneNumber}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Customer's address:</span>
                <span>{booking.address && booking.address}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Number of tickets:</span>
                <span>{booking.numberTicket && booking.numberTicket}</span>
                <span>{booking.numberTicket > 1 ? "tickets" : "ticket"}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Total price:</span>
                <span>
                  {booking.price &&
                    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      booking.price
                    )}
                </span>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </Layout>
  );
};

export default BookingDetailPage;
