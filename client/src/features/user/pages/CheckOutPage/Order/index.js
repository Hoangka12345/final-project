import React, { useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

import styles from "./Order.module.scss";
import classNames from "classnames/bind";
import { Paper } from "@mui/material";
import { URL_THUMBNAIL } from "../../../../../components/Constants";

const cx = classNames.bind(styles);

function Order(props) {
  // ---------props----------
  const { tour } = props;

  // --------router-dom----------
  const location = useLocation();

  // ----------useMemo--------------
  const params = useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("tour-thumbnail")}>
          <img src={tour.thumbnail && `${URL_THUMBNAIL}/${tour.thumbnail[0]}`} alt="" />
        </div>
        <div className={cx("tour-info")}>
          <div className={cx("tour-title")}>
            <span>{tour.code && tour.code}</span>
            <span>{tour.title && tour.title}</span>
          </div>
          <div className={cx("tour-item")}>
            <LocationOnIcon sx={{ fontSize: "2rem", mr: 0.5 }} />
            <div>
              {tour.city && tour.city} |{" "}
              {params._ticket > 1 ? `${params._ticket} tickets` : "1 ticket"}
            </div>
          </div>
          <div className={cx("tour-item")}>
            <AccessTimeIcon sx={{ fontSize: "2rem", mr: 0.5 }} />
            <div>{tour.time && tour.time} | Phương tiện</div>
            {tour.transport === "Cars" ? (
              <DirectionsBusIcon className={cx("content-icon")} />
            ) : tour.transport === "Plane" ? (
              <AirplanemodeActiveIcon className={cx("content-icon")} />
            ) : (
              tour.transport === "Both cars and plane" && (
                <div>
                  <span>
                    <DirectionsBusIcon className={cx("content-icon")} />
                  </span>
                  <span>/</span>
                  <span>
                    <AirplanemodeActiveIcon className={cx("content-icon")} />
                  </span>
                </div>
              )
            )}
          </div>
          <div className={cx("tour-item")}>
            <EventAvailableIcon sx={{ fontSize: "2rem", mr: 0.5 }} />
            <div>
              <span>Departure date: </span> {moment(params._date).format("MM-DD-YYYY")}
            </div>
          </div>
        </div>
        <div className={cx("price")}>
          <span>Total price:</span>
          <span>
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
              tour.price && tour.price * params._ticket
            )}
          </span>
        </div>
      </div>
      <Paper className={cx("note")}>
        <span>
          After completing the order, the staff of www.vietnambooking.com will contact you to
          confirm the tour status. If you have any questions, please contact the hotline{" "}
        </span>
        <span>1900 3398</span>
      </Paper>
    </div>
  );
}

export default Order;
