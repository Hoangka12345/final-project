import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

import { Button, Rating, Tooltip } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import DoneIcon from "@mui/icons-material/Done";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FlagIcon from "@mui/icons-material/Flag";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import HotelIcon from "@mui/icons-material/Hotel";

import styles from "./TourIntro.module.scss";
import classNames from "classnames/bind";

import Slide from "./Slide";
import request from "../../../../../Utils/request";

const cx = classNames.bind(styles);

function TourIntro(props) {
  // ----------props-------------
  const { tour, user, socket } = props;

  // --------state----------
  const [rating, setRating] = useState(0);
  const [tourRating, setTourRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [checkAuth, setCheckAuth] = useState(true);

  // --------cookie----------
  const [cookie, setCookie, removeCookie] = useCookies();

  // --------snackber----------
  const { enqueueSnackbar } = useSnackbar();

  // --------router-dom----------
  const location = useLocation();

  // --------memo----------
  const tourId = useMemo(() => {
    return queryString.parse(location.search)._id;
  }, [location.search]);

  // --------call api to get rating-------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get(`/tour/rate/${tourId}`);
        if (res.status === 200) {
          const allRatings = res.data.ratings;
          setTourRating(res.data.rating);
          setRatings(allRatings);
          if (user._id) {
            const currentRating = allRatings.filter(
              (data) => data.userId === user._id
            );
            setRating(currentRating[0].rate);
          }
        }
      } catch (error) {}
    })();

    (async () => {
      if (cookie["token"] && cookie["role"] == 1) {
        try {
          const res = await request.get("/booking/show");
          if (res.status === 200) {
            const check = res.data.bookings.filter(
              (booking) => booking.tourId === tourId
            );
            if (check[0]) {
              setCheckAuth(true);
            } else {
              setCheckAuth(false);
            }
          }
        } catch (error) {}
      } else {
        setCheckAuth(false);
      }
    })();
  }, []);

  // -----------handle rating socket-----------
  useEffect(() => {
    socket?.on("rating", (data) => {
      setTourRating(data.rating);
      setRatings(data.ratings);
    });
  }, [socket]);

  const totalRating = useMemo(() => {
    const decimal = parseInt(tourRating.toString().split(",")[1]);
    if (decimal > 0 && decimal < 5) {
      return parseInt(`${tourRating.toString().split(",")[1]}.0`);
    } else if (decimal > 5 && decimal < 9) {
      return parseInt(`${tourRating.toString().split(",")[1]}.5`);
    } else {
      return parseInt(tourRating);
    }
  }, [tourRating]);

  // -----------handle rating-------------
  const handleRating = async () => {
    console.log(checkAuth);
    if (!checkAuth) {
      enqueueSnackbar("You need to experience before giving feedback!", {
        variant: "error",
      });
      setRating(0);
      return;
    } else {
      try {
        const res = await request.post("/tour/rate", { tourId, rate: rating });
        if (res.status === 200) {
          setTourRating(res.data.rating);
          if (user._id) {
            const check = ratings.filter(
              (rating) => rating.userId === user._id
            );
            if (!check[0]) {
              setRatings((prev) => [...prev, 1]);
            }
          }
          enqueueSnackbar("Giving rating successfully!", {
            variant: "success",
          });
          socket.emit("rating", { tourId });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("title")}>{tour.title && tour.title}</div>

        <Slide tour={tour} />

        <div className={cx("rating")}>
          <p>Rating for tour</p>
          <div className={cx("rating-content")}>
            <span className={cx("rating-label")}>Rating of tour: </span>
            <div className={cx("rating-star")}>
              <Rating
                name="simple-controlled"
                value={totalRating}
                readOnly
                size="large"
                sx={{ fontSize: "2.5rem" }}
                precision={0.5}
              />
              <span className={cx("rating-status")}>{`${tourRating}(${
                ratings.length
              } ${ratings.length > 1 ? "reviews" : "review"})`}</span>
            </div>
          </div>
          <div className={cx("rating-content")}>
            <span className={cx("rating-label")}>Your rating for tour: </span>
            <div className={cx("rating-star")}>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                size="large"
                sx={{ fontSize: "2.5rem" }}
              />
              <span className={cx("rating-status")}>
                {rating === 1
                  ? "very bad"
                  : rating === 2
                  ? "bad"
                  : rating === 3
                  ? "normal"
                  : rating === 4
                  ? "good"
                  : rating === 5
                  ? "very good"
                  : ""}
              </span>

              <span>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => handleRating()}
                  sx={{ ml: 2, fontWeight: "bold" }}
                >
                  vote
                </Button>
              </span>
            </div>
          </div>
        </div>

        <div className={cx("tour-info")}>
          <p>Services of tour</p>
          <div className={cx("tour-info__content")}>
            <div className={cx("content-item")}>
              <LocationOnIcon className={cx("content-icon")} />
              <span>{tour.city && tour.city}</span>
            </div>
            <div>{tour.time && tour.time}</div>
            <div className={cx("content-item")}>
              <span>Phương tiện</span>
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
            <div>
              Code: <span className={cx("content-item__value")}>GCH190102</span>
            </div>
          </div>
          <div className={cx("date-start")}>
            <EventAvailableIcon className={cx("content-icon")} />
            <span>
              Departure day:{" "}
              <span className={cx("content-item__value")}>
                {tour.dateStart && tour.dateStart}
              </span>
            </span>
          </div>
        </div>

        <div className={cx("service")}>
          <p>Accompanying services</p>
          <div className={cx("service-content")}>
            {tour.accompanyingService &&
              tour.accompanyingService.map((service) => {
                return (
                  <div className={cx("service-item")} key={service}>
                    {service === "Insurance" ? (
                      <DoneIcon
                        className={cx("service-icon")}
                        sx={{ fontSize: "2.5rem" }}
                      />
                    ) : service === "Sightseeing tickets" ? (
                      <AirplaneTicketIcon
                        className={cx("service-icon")}
                        sx={{ fontSize: "2.5rem" }}
                      />
                    ) : service === "Meal" ? (
                      <FastfoodIcon
                        className={cx("service-icon")}
                        sx={{ fontSize: "2.5rem" }}
                      />
                    ) : service === "Tour guide" ? (
                      <FlagIcon
                        className={cx("service-icon")}
                        sx={{ fontSize: "2.5rem" }}
                      />
                    ) : service === "CarS (as required)" ? (
                      <DirectionsBusFilledIcon
                        className={cx("service-icon")}
                        sx={{ fontSize: "2.5rem" }}
                      />
                    ) : (
                      service === "Hotel/Motel room" && (
                        <HotelIcon
                          className={cx("service-icon")}
                          sx={{ fontSize: "2.5rem" }}
                        />
                      )
                    )}
                    <span>{service}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={cx("tour-description")}>
          <span>{tour.introduction && tour.introduction}</span>

          <div className={cx("tour-action")}>
            <p>Join the tour you can:</p>
            <ul>
              {tour.introContent &&
                tour.introContent.map((data) => {
                  return <li key={data}>{data}</li>;
                })}
            </ul>
          </div>

          <div className={cx("contact")}>
            Quickly register a tour with Vietnam Travel to experience the
            exciting journey at {tour.city && tour.city}! Contact the
            switchboard
            <span> 1900 3398 </span>
            to get more detail.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourIntro;
