import React, { useContext, useEffect, useMemo, useState } from "react";
import moment from "moment";

import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";

import styles from "./DashboardPage.module.scss";
import classNames from "classnames/bind";

import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";
import Header from "../../components/Header";
import Barchart from "../../../../components/BarChart";
import TourChart from "./BarChart";
import request from "../../../../Utils/request";

const cx = classNames.bind(styles);

function DashboardPage(props) {
  // --------state----------
  const [selectYear, setSelectYear] = useState("");
  const [dataDashboards, setDataDashboards] = useState([]);
  const [dataTourDashboards, setDataTourDashboards] = useState([]);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);

  // --------context-------
  const { loading } = useContext(LoadingContext);

  // --------call api to get all bookings-----------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("/company/booking/dashboard");
        if (res.status === 200) {
          setDataDashboards(res.data.dashboards);
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        const res = await request.get("/company/booking/dashboard-tour");
        if (res.status === 200) {
          setDataTourDashboards(res.data.dashboards[0].tour);
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        const res = await request.get("/company/tour/show");
        if (res.status === 200) {
          setTours(res.data.company[0].tours);
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        const res = await request.get("/company/booking/show");
        if (res.status === 200) {
          setBookings(res.data.bookings);
        }
      } catch (error) {}
    })();
  }, []);

  // --------memo----------
  const dataDashboardsByYear = useMemo(() => {
    const array = [];

    const data = dataDashboards.filter((dataDashboard) => {
      if (selectYear == "") return dataDashboard._id.year == 0;
      return dataDashboard._id.year == selectYear;
    });

    data.map((i) => {
      array.push({ month: i._id.month, total: i.totalCost });
    });

    return array;
  }, [selectYear]);

  const dataTourDashboardsByYear = useMemo(() => {
    const array = [];

    const data = dataTourDashboards.filter((dataDashboard) => {
      if (selectYear == "") return dataDashboard.year == 0;
      return dataDashboard.year == selectYear;
    });

    data.map((i) => {
      array.push({ total: i.totalCost, title: i.title });
    });

    return array.sort((a, b) => b.total - a.total);
  }, [selectYear]);

  return loading ? (
    <Progress />
  ) : (
    <>
      <Header />

      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("header")}>
            <h2>Manager revenue on each year</h2>
            <Box sx={{ width: "30%", margin: "0 auto", pb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.4rem" }}>
                  Year
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectYear}
                  label="Age"
                  sx={{ fontSize: "1.6rem" }}
                  onChange={(e) => setSelectYear(e.target.value)}
                >
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className={cx("main-content")}>
            <div className={cx("content-data")}>
              <div className={cx("data")}>
                <div className={cx("item")}>
                  <p>
                    <span>Tours</span>
                    <span>avainable</span>
                  </p>
                  <p>
                    <span>{tours.length}</span> {tours.length > 0 ? "tours" : "tour"}
                  </p>
                </div>
                <div className={cx("item")}>
                  <p>
                    <span>Bookings</span>
                    <span>total</span>
                  </p>
                  <p>
                    <span>{bookings.length}</span> {bookings.length > 0 ? "tours" : "tour"}
                  </p>
                </div>
              </div>
              <div className={cx("data")}>
                <div className={cx("item")}>
                  <p>
                    <span>Total income</span>
                  </p>
                  <p>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        dataDashboardsByYear.reduce((total, data) => {
                          return total + data.total;
                        }, 0)
                      )}
                    </span>{" "}
                  </p>
                </div>
                <div className={cx("item")}>
                  <p>
                    <span>Company's profit</span>
                  </p>
                  <p>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        dataDashboardsByYear.reduce((total, data) => {
                          return total + data.total;
                        }, 0) * 0.9
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className={cx("content-dashboard")}>
              <TourChart datas={dataTourDashboardsByYear} title="a company total income" />
              <div className={cx("dashboard-note")}>
                <ul>
                  {dataTourDashboardsByYear.map((data, index) => {
                    return (
                      <li key={index}>
                        <span>Top {index + 1}: </span>
                        <span>{data.title}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className={cx("main-content")}>
            <div className={cx("test")}>
              <Barchart datas={dataDashboardsByYear} title="one month total income" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
