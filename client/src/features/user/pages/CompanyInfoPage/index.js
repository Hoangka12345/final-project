import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useSnackbar } from "notistack";
import { orderBy, isEqual } from "lodash";

import { Grid, Pagination } from "@mui/material";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

import styles from "./CompanyInfoPage.module.scss";
import classNames from "classnames/bind";

import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import Filter from "./Filter";
import Tour from "../../components/Tour";
import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";
import request from "../../../../Utils/request";

const cx = classNames.bind(styles);

function CompanyInfoPage(props) {
  // --------useState-------
  const [tours, setTours] = useState([]);
  const [toursSort, setToursSort] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tourPerPage, setTourPerPage] = useState(6);

  // --------context-------
  const { loading } = useContext(LoadingContext);

  // --------router-dom----------
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // ---------------snackbar----------------
  const { enqueueSnackbar } = useSnackbar();

  // --------------useMemo (handel query params when change any on search of url)----------------------
  const queryParams = useMemo(() => {
    const param = queryString.parse(location.search);

    return {
      ...param,
      _page: param._page || 1,
    };
  }, [location.search]);

  // --------useRef-------
  const paramId = useRef(queryString.parse(location.search)._id);
  const currentTours = useRef([]);

  // --------get all tours of company -------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get(`/tour/showCompany/${paramId.current}`);
        if (res.status === 200) {
          setTours(res.data.company[0].tours);
          setToursSort(res.data.company[0].tours);
        }
      } catch (error) {}
    })();

    window.onload = function () {
      setSearchParams({ _id: paramId.current, _page: 1 });
    };
  }, []);

  // --------handle sort when change search-------------
  useEffect(() => {
    setSearchParams(queryParams);

    // -------------handle change page-------------
    setCurrentPage(queryParams._page);

    // --------handle choose region and price sort-------------
    (() => {
      if (
        !queryParams.Northern &&
        !queryParams.Central &&
        !queryParams.Southern
      ) {
        if (queryParams._price) {
          const newTours = orderBy(tours, ["price"], [queryParams._price]);
          setToursSort(newTours);
        } else {
          setToursSort(tours);
        }
      } else {
        const newTours = [];
        tours.map((tour) => {
          const isNorthern = isEqual(tour.region, queryParams.Northern);
          const isCentral = isEqual(tour.region, queryParams.Central);
          const isSouthern = isEqual(tour.region, queryParams.Southern);
          if (isNorthern || isCentral || isSouthern) {
            newTours.push(tour);
          }
        });
        if (queryParams._price) {
          setToursSort(orderBy(newTours, ["price"], [queryParams._price]));
        } else {
          setToursSort(newTours);
        }
      }
    })();

    (() => {
      if (queryParams.key) {
        const keySearch = queryParams.key.toLowerCase();
        const newTours = tours.filter((tour) => {
          return tour.title.toLowerCase().match(new RegExp(keySearch, "g"));
        });
        setToursSort(newTours);
      } else {
        // setToursSort(tours);
      }
    })();
  }, [queryParams]);

  // --------------handle change page of pagination----------------
  const handleChangePagination = (e, value) => {
    setSearchParams({ ...queryParams, _page: `${value}` });
  };

  // ----------------handle caculate current tours-------------
  const indexOfFirstTour = (currentPage - 1) * tourPerPage;
  const indexOfLastTour = currentPage * tourPerPage;
  currentTours.current = toursSort.slice(indexOfFirstTour, indexOfLastTour);

  return loading ? (
    <Progress />
  ) : (
    <div>
      <Header />

      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("company-header")}>
            <div className={cx("header-content")}>
              <div className={cx("avatar")}>
                <img
                  src="https://vietnam.travel/themes/custom/vietnamtourism/images/logo.jpg"
                  alt=""
                />
              </div>
              <div className={cx("info_1")}>
                <div className={cx("info-item")}>
                  <TourOutlinedIcon
                    sx={{ fontSize: "2.5rem", mr: 1, color: "#1c1c1c" }}
                  />
                  <span>total of tour: </span>
                  <span>{tours.length}</span>
                </div>
                <div className={cx("info-item")}>
                  <DoneIcon
                    sx={{ fontSize: "2.5rem", mr: 1, color: "#1c1c1c" }}
                  />
                  <span>total of bookings: </span>
                  <span>15</span>
                </div>
                <div className={cx("info-item")}>
                  <DoneAllOutlinedIcon
                    sx={{ fontSize: "2.5rem", mr: 1, color: "#1c1c1c" }}
                  />
                  <span>complete percent: </span>
                  <span>100%</span>
                </div>
              </div>
              <div className={cx("info_2")}>
                <div className={cx("info-item")}>
                  <StarBorderOutlinedIcon
                    sx={{ fontSize: "2.5rem", mr: 1, color: "#1c1c1c" }}
                  />
                  <span>Rating: </span>
                  <span>4.9 </span>
                </div>
                <div className={cx("info-item")}>
                  <PersonAddAlt1OutlinedIcon
                    sx={{ fontSize: "2.5rem", mr: 1, color: "#1c1c1c" }}
                  />
                  <span>Operation day: </span>
                  <span>3 month ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("company-tour")}>
            <div className={cx("main-content")}>
              <div className={cx("menu-sort")}>
                <Filter queryParams={queryParams} />
              </div>
              <div className={cx("tour-content")}>
                <Grid container spacing={2}>
                  {currentTours.current.map((tour, index) => (
                    <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
                      <Tour tour={tour} />
                    </Grid>
                  ))}
                </Grid>
                <Pagination
                  sx={{
                    margin: "1.5rem auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  size="large"
                  count={Math.ceil(toursSort.length / 6)}
                  color="primary"
                  onChange={handleChangePagination}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CompanyInfoPage;
