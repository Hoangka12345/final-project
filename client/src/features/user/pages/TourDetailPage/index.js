import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import queryString from "query-string";
import io from "socket.io-client";

import styles from "./TourDetailPage.module.scss";
import classNames from "classnames/bind";

import { Grid } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import Footer from "../../../../components/Footer";
import Header from "../../components/Header";
import TourIntro from "./TourIntro";
import Planning from "./Planning";
import Feedback from "./Feedback";
import RelatedTour from "./RelatedTour";
import Booking from "./Booking";
import request from "../../../../Utils/request";
import Progress from "../../../../components/Progress";
import { LoadingContext } from "../../../../Context/LoadingContext";

const cx = classNames.bind(styles);

function TourDetailPage(props) {
  // --------state--------------
  const [tour, setTour] = useState({});
  const [user, setUser] = useState({});
  const [socket, setSocket] = useState(null);

  // -------------context----------------
  const { loading } = useContext(LoadingContext);

  // -----------cookie----------
  const [cookie, setCookie, removeCookie] = useCookies();

  // ---------router-dom----------------
  const location = useLocation();

  // -----------memo------------------
  const params = useMemo(() => {
    return queryString.parse(location.search)._id;
  }, [location.search]);

  useEffect(() => {
    (async () => {
      if (cookie["token"] || cookie["role"] == 1) {
        try {
          const res = await request.get("/");
          if (res.status === 200) {
            setUser(res.data.user);
          }
        } catch (error) {}
      }
    })();
  }, []);

  // ---------connect socket.io---------
  useEffect(() => {
    const socketIo = io("http://localhost:5000");
    setSocket(socketIo);
  }, []);

  useEffect(() => {
    const getTour = async () => {
      try {
        const res = await request.get(`/tour/show/${params}`);
        if (res.status === 200) {
          setTour(res.data.tour[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTour();
  }, [params]);

  return loading ? (
    <Progress />
  ) : (
    <div>
      <Header />

      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("intro")}>
            <div className={cx("intro-item")}>Tours</div>
            <KeyboardDoubleArrowRightIcon className={cx("intro-icon")} />
            <div className={cx("intro-item")}>
              {tour.region && `Explore the ${tour.region} Vietnam`}
            </div>
            <KeyboardDoubleArrowRightIcon className={cx("intro-icon")} />
            <div className={cx("intro-item")}>{tour.city && tour.city}</div>
            <KeyboardDoubleArrowRightIcon className={cx("intro-icon")} />
            <div className={cx("intro-item__title")}>
              {tour.title && tour.title}
            </div>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TourIntro tour={tour} user={user} socket={socket} />
              <Planning tour={tour} />
              <Feedback socket={socket} />
              <RelatedTour tour={tour} />
            </Grid>

            <Grid item xs={4}>
              <Booking id={params} />
            </Grid>
          </Grid>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TourDetailPage;
