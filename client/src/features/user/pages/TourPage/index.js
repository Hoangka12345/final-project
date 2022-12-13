import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { orderBy } from "lodash";

import styles from "./TourPage.module.scss";
import classNames from "classnames/bind";
import { Paper, Grid, Pagination, Tabs, Tab, Chip } from "@mui/material";

import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import Tour from "../../components/Tour";
import Filter from "./Filter";
import request from "../../../../Utils/request";
import Progress from "../../../../components/Progress";
import { LoadingContext } from "../../../../Context/LoadingContext";

const cx = classNames.bind(styles);

function TourPage(props) {
  // ----------router-dom--------------------
  const location = useLocation();
  const paramKey = queryString.parse(location.search)._key;
  const [searchParams, setSearchParams] = useSearchParams();

  // -----------state--------------------
  const [tours, setTours] = useState([]);
  const [toursSort, setToursSort] = useState([]);
  const [value, setValue] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [tourPerPage, setTourPerPage] = useState(6);

  // ----------useRef-------
  const currentTours = useRef([]);

  // --------------context----------
  const { loading } = useContext(LoadingContext);

  // ----------memo - handle when user sort-------------
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: params._page || 1,
      // _categories: "Resort",
      // _categories: "Explore - experience",
    };
  }, [location.search]);

  // ------------call api to get tour info
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("tour/show", {
          params: queryParams,
        });
        if (res.status === 200) {
          setTours(res.data.tours);
          setToursSort(res.data.tours);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    window.onload = function () {
      if (paramKey) {
        setSearchParams({ key: paramKey, _page: 1 });
      } else {
        setSearchParams({ _page: 1 });
      }
    };
  }, []);

  useEffect(() => {
    setCurrentPage(queryParams._page);

    (async () => {
      try {
        const res = await request.get("tour/show", {
          params: queryParams,
        });
        if (res.status === 200) {
          setTours(res.data.tours);
          setToursSort(res.data.tours);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location.search]);

  // -------------handle when user change sort by price-----------
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    if (newValue == 1) {
      setSearchParams({ ...queryParams, _price: "1" });
    } else if (newValue == 2) {
      setSearchParams({ ...queryParams, _price: "-1" });
    }
  };

  // ----------handle when user change pagination-----------
  const handleChangePagination = (e, value) => {
    setSearchParams({ ...queryParams, _page: value });
  };

  // ----------handle change page-----------
  const firstItem = (currentPage - 1) * tourPerPage;
  const lastItem = currentPage * tourPerPage;
  currentTours.current = toursSort.slice(firstItem, lastItem);

  return loading ? (
    <Progress />
  ) : (
    <div>
      <Header />

      <div className="wrapper">
        <div className={cx("image-intro")}>
          <img
            src="https://cdnimgen.vietnamplus.vn/uploaded/wbxx/2021_04_09/vietnam_to_be_fastestgrowing_asean_economy.jpg"
            alt=""
          />
        </div>

        <div className={cx("container")}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className={cx("city-name")}>
                  ~~ Explore {paramKey ? paramKey : "Vietnam travel"} ~~
                </div>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper
                sx={{
                  minHeight: "10rem",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                <Filter queryParams={queryParams} />
              </Paper>
            </Grid>

            <Grid item xs={9}>
              <Paper sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className={cx("price-sort")}>
                  <Tabs value={value} onChange={handleChangeTab}>
                    <Tab
                      value="1"
                      label="Price low to hight"
                      disabled={tours.length > 0 ? false : true}
                      sx={{ fontSize: "1.4rem" }}
                    />
                    <Tab
                      value="2"
                      label="Price hight to low"
                      disabled={tours.length > 0 ? false : true}
                      sx={{ fontSize: "1.4rem" }}
                    />
                  </Tabs>
                </div>
                <div className={cx("filter-result")}>
                  <div className={cx("filter-result__content")}>
                    <Chip
                      label="The most interested tours"
                      color={tours.length > 0 ? "info" : "default"}
                      sx={{ fontSize: "1.6rem", mb: 2 }}
                    />
                  </div>
                </div>
              </Paper>

              <div className={cx("show-tour")}>
                {toursSort.length > 0 ? (
                  <Grid container spacing={3}>
                    {currentTours.current.map((tour, index) => {
                      return (
                        <Grid item xs={4} key={index}>
                          <Tour tour={tour} />
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : (
                  <div className={cx("no-tour")}>
                    <p>
                      Unfortunately, no company provides travel services to this
                      place yet!
                    </p>
                    <p>
                      You can choose from one of the following famous tourist
                      attractions
                    </p>
                  </div>
                )}
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
            </Grid>
          </Grid>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TourPage;
