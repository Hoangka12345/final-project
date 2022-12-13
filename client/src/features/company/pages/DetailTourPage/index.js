import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";

import styles from "./DetailTour.module.scss";
import classNames from "classnames/bind";

import Footer from "../../../../components/Footer";
import Header from "../../components/Header";
import Progress from "../../../../components/Progress";
import { LoadingContext } from "../../../../Context/LoadingContext";
import request from "../../../../Utils/request";
import Slide from "./Slide";
import { Button } from "@mui/material";

const cx = classNames.bind(styles);

const DetailTourPage = () => {
  // ------------state-------------
  const [tour, setTour] = useState({});
  const [bookings, setBookings] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [images, setImages] = useState([]);

  // ----------router-dom-------------
  const navigate = useNavigate();
  const location = useLocation();

  // ------------memo-----------
  const tourId = useMemo(() => {
    return queryString.parse(location.search)._id;
  }, [location.search]);

  // -----------context-------------
  const { loading } = useContext(LoadingContext);

  // ------------call api to get tour---------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get(`/company/tour/show/${tourId}`);
        console.log(res);
        if (res.status === 200) {
          setTour(res.data.tour);
          setImages(res.data.tour.thumbnail);
          setBookings(res.data.bookings.length);
          setRatings(res.data.ratings.length);
        }
      } catch (error) {}
    })();
  }, [tourId]);

  return loading ? (
    <Progress />
  ) : (
    <>
      <Header />

      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("header")}>
            <h2>~{tour.title ?? ""}~</h2>
            <div className={cx("header-info")}>
              <div className={cx("item")}>
                <p>Date of establishment</p>
                <p>
                  {moment(tour.createdAt && tour.createdAt).format(
                    "DD-MM-YYYY"
                  )}
                </p>
              </div>
              <div className={cx("item")}>
                <p>Number of bookings</p>
                <p>{bookings}</p>
              </div>
              <div className={cx("item")}>
                <p>Rating</p>
                <p>
                  {`${tour.rate ?? ""}/5 (${ratings} ${
                    ratings > 1 ? "viewers" : "viewer"
                  })`}{" "}
                </p>
              </div>
            </div>
          </div>

          <div className={cx("content")}>
            <div className={cx("slide")}>
              <div className={cx("slide-display")}>
                <Slide images={images} />
              </div>
            </div>
            <div className={cx("info")}>
              <div className={cx("info-item")}>
                <p>Region:</p>
                <p>{tour.region ?? ""}</p>
              </div>

              <div className={cx("info-item")}>
                <p>City:</p>
                <p>{tour.city ?? ""}</p>
              </div>

              <div className={cx("info-item")}>
                <p>Departure time:</p>
                <p>{tour.dateStart ?? ""}</p>
              </div>

              <div className={cx("info-item")}>
                <p>Introduction:</p>
                <p>{tour.introduction ?? ""}</p>
              </div>

              <div className={cx("info-item")}>
                <p>content of tour:</p>
                <div className={cx("list")}>
                  <ul>
                    {tour.introContent &&
                      tour.introContent.map((data) => {
                        return <li key={data}>{data}</li>;
                      })}
                  </ul>
                </div>
              </div>

              <div className={cx("info-item")}>
                <p>Transportation:</p>
                <p>{tour.transport ?? ""}</p>
              </div>

              <div className={cx("info-item")}>
                <p>service of tour:</p>
                <div className={cx("list")}>
                  <ul>
                    {tour.service &&
                      tour.service.map((data) => {
                        return <li key={data}>{data}</li>;
                      })}
                  </ul>
                </div>
              </div>

              <div className={cx("info-item")}>
                <p>Duration:</p>
                <p>{tour.time ?? ""}</p>
              </div>

              <div className={cx("info-item")}>
                <p>Programs of tour:</p>
                <div className={cx("list")}>
                  <ul>
                    {tour.program &&
                      tour.program.map((data) => {
                        return <li key={data.content}>{data.content}</li>;
                      })}
                  </ul>
                </div>
              </div>

              <div className={cx("info-item")}>
                <p>Type of tour:</p>
                <p>{tour.category ?? ""}</p>
              </div>

              <div className={cx("info-item")}>
                <p>Price of tour:</p>
                <p>
                  {tour.price &&
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(tour.price)}
                </p>
              </div>

              <div className={cx("btn_edit")}>
                <Button
                  variant="contained"
                  sx={{ fontSize: "1.4rem", fontWeight: "bold" }}
                  onClick={() =>
                    navigate({
                      pathname: "/company/edit",
                      search: queryString.stringify({ _id: tourId }),
                    })
                  }
                >
                  Edit tour's info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DetailTourPage;
