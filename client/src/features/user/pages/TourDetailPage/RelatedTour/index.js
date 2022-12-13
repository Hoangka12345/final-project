import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { Paper } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import styles from "./RelatedTour.module.scss";
import classNames from "classnames/bind";

import request from "../../../../../Utils/request";
import { LoadingContext } from "../../../../../Context/LoadingContext";
import { URL_THUMBNAIL } from "../../../../../components/Constants";

const cx = classNames.bind(styles);

function RelatedTour(props) {
  // --------props----------
  const { tour } = props;

  // ---------state----------
  const [tours, setTours] = useState([]);

  // -----------context----------
  const { setLoading } = useContext(LoadingContext);

  // ----------router-dom--------------
  const navigate = useNavigate();

  // ------call api get best seller tours-----------
  useEffect(() => {
    const getRelatedTours = async () => {
      if (tour.category) {
        try {
          const res = await request.get(`/tour/relatedtour/${tour.category}`, {
            params: { category: tour.category, title: tour.title },
          });
          if (res.status === 200) {
            setTours(res.data.tours);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getRelatedTours();
  }, [tour]);

  //------------handle when user click related tour---------
  const navigateTour = (id) => {
    navigate({
      pathname: "/tour-detail",
      search: queryString.stringify({ _id: id }),
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Other tours you may be interested in</div>

      {tours.length > 0 &&
        tours.map((tour) => {
          return (
            <Paper className={cx("tour")} key={tour._id}>
              <div className={cx("thumbnail")} onClick={() => navigateTour(tour._id)}>
                <img src={`${URL_THUMBNAIL}/${tour.thumbnail[0]}`} alt="" />
              </div>
              <div className={cx("content")}>
                <div className={cx("tour-title")} onClick={() => navigateTour(tour._id)}>
                  {tour.title}
                </div>
                <div className={cx("tour-price")}>
                  <span>Price: </span>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    tour.price
                  )}
                </div>
                <div className={cx("departure")}>
                  <EventAvailableIcon className={cx("departure-icon")} />
                  <div>
                    <span>Departure time: </span> {tour.dateStart}
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
    </div>
  );
}

export default RelatedTour;
