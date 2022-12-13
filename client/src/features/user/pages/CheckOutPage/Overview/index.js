import React, { useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { Grid } from "@mui/material";

import styles from "./Overview.module.scss";
import classNames from "classnames/bind";

import { CheckOutContext } from "../../../../../Context/CheckOutContext";

const cx = classNames.bind(styles);

function Overview(props) {
  // --------props----------
  const { tour, timeStart, timeOut } = props;

  // --------context-------
  const { name, email, phone, address } = useContext(CheckOutContext);

  // --------router-dom----------
  const location = useLocation();

  // --------useRef----------
  const params = useRef(queryString.parse(location.search));

  return (
    <div className={cx("wrapper")}>
      <div className={cx("overview-title", "title-summary")}>Order Summary</div>
      <div className={cx("summary")}>
        <div>
          <p>Name of Tour</p>
          <p>Number of ticket</p>
          <p>Departure</p>
          <p>Time out</p>
          <p>price of tour</p>
          <p>Discount (if any)</p>
          <p>Total</p>
        </div>
        <div>
          <p>{tour.title && tour.title}</p>
          <p>{params.current._ticket} tickets</p>
          <p>{timeStart}</p>
          <p>{timeOut}</p>
          <p>{tour.price && tour.price} vnd/person</p>
          <p>{tour.saleOff && tour.saleOff}%</p>
          <p>{tour.price && tour.price * params.current._ticket}vnd</p>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6.5}>
          <div className={cx("overview-title")}>Customer</div>
          <div className={cx("customer-info")}>{name}</div>
          <div className={cx("customer-info")}>{email}</div>
          <div className={cx("customer-info")}>{phone}</div>
          <div className={cx("customer-info")}>{address}</div>
        </Grid>
        <Grid item xs={5.5}>
          <div className={cx("overview-title")}>Payment details</div>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <div className={cx("card")}>
                <p>Card type</p>
                <p>Card holder</p>
                <p>Card number</p>
                <p>Expiry date</p>
              </div>
            </Grid>
            <Grid item xs={7}>
              <div className={cx("card")}>
                <p>Visa</p>
                <p>Hoàng Phan</p>
                <p>xxxx-xxxx-xxxx-1234</p>
                <p>10/13/2022</p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Overview;
