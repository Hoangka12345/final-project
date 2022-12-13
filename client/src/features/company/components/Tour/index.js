import React from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

import { Paper } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faCalendarCheck,
  faCheckDouble,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Tour.module.scss";
import classNames from "classnames/bind";

import { URL_THUMBNAIL } from "../../../../components/Constants";

const cx = classNames.bind(styles);

function Tour(props) {
  // ---------props----------
  const { tour } = props;

  // ----------router-dom----------
  const navigate = useNavigate();

  // -----------handle when user click to title-----------
  const handleClickNavigateEditPage = () => {
    navigate({
      pathname: "/company/detail-tour",
      search: queryString.stringify({ _id: tour._id && tour._id }),
    });
  };

  return (
    <Paper
      sx={{
        width: "100%",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        mb: 1,
      }}
    >
      <div className={cx("thumbnail")}>
        <img
          src={tour.thumbnail && `${URL_THUMBNAIL}/${tour.thumbnail[0]}`}
          alt=""
        />
        {tour.saleOff & (tour.saleOff > 0) ? (
          <div className={cx("sale-off")}>
            {tour.saleOff && tour.saleOff}% Discount
          </div>
        ) : (
          <></>
        )}
        <div className={cx("address")}>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>
            {tour.region && tour.region}, {tour.city && tour.city}
          </span>
        </div>
      </div>
      <div className={cx("tour-info")}>
        <div className={cx("title")} onClick={handleClickNavigateEditPage}>
          {tour.title && tour.title}
        </div>
        <div className={cx("time-transport")}>
          <span>
            <strong>Time:</strong> {tour.time && tour.time}
          </span>
          <FontAwesomeIcon icon={faBus} />
        </div>
        <div className={cx("tour-info__item")}>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>
            <strong>City:</strong> {tour.city && tour.city}
          </span>
        </div>
        <div className={cx("tour-info__item")}>
          <FontAwesomeIcon icon={faCalendarCheck} />
          <span>
            <strong>Departure:</strong> {tour.dateStart && tour.dateStart}
          </span>
        </div>
        <div className={cx("tour-info__item")}>
          <FontAwesomeIcon icon={faCheckDouble} />
          <span>
            <strong>Booked:</strong> {tour.totalOrders ? tour.totalOrders : "0"}
          </span>
        </div>
        <div className={cx("status-tour")}>
          <AutorenewIcon sx={{ fontSize: "2rem" }} />
          <span>
            <strong>Status:</strong> {tour.avaiableTour > 0 && "avainable"}
          </span>
        </div>
        <div className={cx("price")}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(tour.price && tour.price)}
          <span>/person</span>
        </div>
      </div>
    </Paper>
  );
}

export default Tour;
