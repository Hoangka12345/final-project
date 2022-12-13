import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useSnackbar } from "notistack";
import { orderBy, isEqual } from "lodash";

import { Grid, Pagination, Paper } from "@mui/material";

import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";

import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import Filter from "./Filter";
import Tour from "../../components/Tour";
import request from "../../../../Utils/request";
import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";

const cx = classNames.bind(styles);

function HomePage(props) {
  // --------------useState------------
  const [tours, setTours] = useState([]);
  const [toursSort, setToursSort] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tourPerPage, setTourPerPage] = useState(6);

  // --------get loading from loading context-----------
  const { loading } = useContext(LoadingContext);

  // --------------useRef (current tours array - which is appearing)-----------
  const currentTours = useRef([]);

  // ------------router-dom-------------------
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // ---------------snackbar----------------
  const { enqueueSnackbar } = useSnackbar();

  // --------------useMemo (handel query params when change any on search of url)----------------------
  const queryParams = useMemo(() => {
    const param = queryString.parse(location.search);
    return {
      ...param,
      _page: param._page || 1,
      _price: param._price || "asc",
    };
  }, [location.search]);

  // ------------call api when change any on search of url--------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("/company/tour/show");
        if (res.status === 200) {
          setTours(res.data.company[0].tours);
          setToursSort(res.data.company[0].tours);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // --------handle sort when change search-------------
  useEffect(() => {
    setSearchParams(queryParams);

    // -------------handle change page-------------
    setCurrentPage(queryParams._page);
    // --------handle choose region and price sort-------------
    (() => {
      if (!queryParams.Northern && !queryParams.Central && !queryParams.Southern) {
        if (queryParams._price) {
          console.log("alo");
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
          <div className={cx("menu-sort")}>
            <Filter queryParams={queryParams} />
          </div>
          {tours.length > 0 ? (
            <div className={cx("main-content")}>
              <Grid container spacing={2}>
                {currentTours.current.map((tour) => (
                  <Grid item lg={4} md={6} sm={6} xs={12} key={tour._id}>
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
                count={Math.ceil(tours.length / 6)}
                color="primary"
                onChange={handleChangePagination}
              />
            </div>
          ) : (
            <div className={cx("no-tours")}>
              <p>Your company hasn't posted any tours yet!</p>
              <p>Let's start creating a new tour!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
