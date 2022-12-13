import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

import { Paper, Rating } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBus,
  faCalendarCheck,
  faCheckDouble,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Tour.module.scss";
import classNames from "classnames/bind";

import { LoadingContext } from "../../../../Context/LoadingContext";
import { URL_THUMBNAIL } from "../../../../components/Constants";
import request from "../../../../Utils/request";

const cx = classNames.bind(styles);

function Tour(props) {
  // ----------props--------------------
  const { tour } = props;

  // ----------state----------
  const [rating, setRating] = useState(0);

  // ----------------context---------
  const { setLoading } = useContext(LoadingContext);

  // --------router-dom----------
  const navigate = useNavigate();

  // --------call api to get rating-------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get(`/tour/rate/${tour._id && tour._id}`);
        if (res.status === 200) {
          setRating(res.data.rating);
        }
      } catch (error) {}
    })();
  }, []);

  // --------memo----------
  const ratingValue = useMemo(() => {
    const decimal = parseInt(rating.toString().split(",")[1]);
    if (decimal > 0 && decimal < 5) {
      return parseInt(`${rating.toString().split(",")[1]}.0`);
    } else if (decimal > 5 && decimal < 9) {
      return parseInt(`${rating.toString().split(",")[1]}.5`);
    } else {
      return parseInt(rating);
    }
  }, [rating]);

  const handleClickTourDetail = () => {
    navigate({
      pathname: "/tour-detail",
      search: queryString.stringify({ _id: tour._id }),
    });
  };

  const handleNavigateCompany = () => {
    navigate({
      pathname: "/company-introduction",
      search: queryString.stringify({ _id: tour.userId }),
    });
  };

  return (
    <Paper
      sx={{
        width: "98%",
        m: "0 auto",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        mb: 1,
      }}
    >
      <div className={cx("thumbnail")} onClick={() => handleClickTourDetail()}>
        <img
          src={tour.thumbnail && `${URL_THUMBNAIL}/${tour.thumbnail[0]}`}
          alt=""
        />
        <div className={cx("sale-off")}>
          {tour.saleOff && tour.saleOff}% Discount
        </div>
        <div className={cx("address")}>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>
            {tour.region && tour.region}, {tour.city && tour.city}
          </span>
        </div>
      </div>
      <div className={cx("tour-info")}>
        <div className={cx("title")} onClick={() => handleClickTourDetail()}>
          {tour.title && tour.title}
        </div>
        <div className={cx("time-transport")}>
          <span>
            <strong>Time:</strong> <span>{tour.time && tour.time}</span>
          </span>
          <FontAwesomeIcon icon={faBus} />
        </div>
        <div className={cx("tour-info__item", "company")}>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>
            <strong>City:</strong> <span>{tour.city && tour.city}</span>
          </span>
        </div>
        <div className={cx("tour-info__item")}>
          <FontAwesomeIcon icon={faCalendarCheck} />
          <span>
            <strong>Departure:</strong>{" "}
            <span>{tour.dateStart && tour.dateStart}</span>
          </span>
        </div>
        <div className={cx("tour-info__item")}>
          <FontAwesomeIcon icon={faCheckDouble} />
          <span>
            <strong>Booked:</strong>{" "}
            <span>{tour.totalOrders && tour.totalOrders} tours</span>
          </span>
        </div>
        <div className={cx("tour-info__item")}>
          <FontAwesomeIcon icon={faBuilding} />
          <span>
            <strong>Company:</strong>{" "}
            <span onClick={handleNavigateCompany}>
              {tour.company && tour.company[0].username}
            </span>
          </span>
        </div>
        <div className={cx("rating-tour")}>
          <AutorenewIcon sx={{ fontSize: "2rem" }} />
          <div className={cx("rating-content")}>
            <strong>Rating:</strong>{" "}
            <Rating
              name="simple-controlled"
              value={ratingValue}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        <div className={cx("price")}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(tour.price)}
        </div>
      </div>
    </Paper>
  );
}

export default Tour;
