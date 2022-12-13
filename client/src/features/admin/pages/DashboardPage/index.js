import React, { useEffect, useMemo, useState } from "react";

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import styles from "./Dashboard.module.scss";
import classNames from "classnames/bind";

import Layout from "../../components/Layout";
import Barchart from "../../../../components/BarChart";
import CompanyChart from "./BarChart";
import request from "../../../../Utils/request";

const cx = classNames.bind(styles);

const DashboardPage = () => {
  // --------state----------
  const [selectYear, setSelectYear] = useState("");
  const [dataDashboards, setDataDashboards] = useState([]);
  const [dataCompanyDashboards, setDataCompanyDashboards] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [tours, setTours] = useState([]);

  // --------call api to get all bookings-----------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("/admin/booking/dashboard");
        if (res.status === 200) {
          setDataDashboards(res.data.dashboards);
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        const res = await request.get("/admin/booking/dashboard-company");
        if (res.status === 200) {
          setDataCompanyDashboards(res.data.dashboards);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const res = await request.get("admin/user/showusers");
        if (res.status === 200) {
          setUserAccounts(res.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const res = await request.get("admin/tour/show");
        if (res.status === 200) {
          setTours(res.data.tours);
        }
      } catch (error) {
        console.log(error);
      }
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

  const dataCompanyDashboardsByYear = useMemo(() => {
    const data = dataCompanyDashboards.filter((dataDashboard) => {
      if (selectYear == "") return dataDashboard._id.year == 0;
      return dataDashboard.year == selectYear;
    });

    const newData = data.sort((a, b) => b.totalCost - a.totalCost);

    return newData.slice(0, 5);
  }, [selectYear]);

  const totalIncome = useMemo(() => {
    const data = dataCompanyDashboards.filter((dataDashboard) => {
      if (selectYear == "") return dataDashboard._id.year == 0;
      return dataDashboard.year == selectYear;
    });

    if (data[0]) {
      return data.reduce((sum, data) => {
        return sum + data.totalCost;
      }, 0);
    } else {
      return 0;
    }
  }, [selectYear]);

  return (
    <Layout>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("header")}>
            <h2>Manager revenue on each year</h2>
            <Box sx={{ width: "30%", margin: "0 auto", pb: 2 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ fontSize: "1.4rem" }}
                >
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
                    <span>Accounts</span>
                    <span>customer</span>
                  </p>
                  <p>
                    <span>{userAccounts.length}</span> accounts
                  </p>
                </div>
                <div className={cx("item")}>
                  <p>
                    <span>Tour</span>
                    <span>total</span>
                  </p>
                  <p>
                    <span>{tours.length}</span> tours
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
                      }).format(totalIncome)}
                    </span>{" "}
                  </p>
                </div>
                <div className={cx("item")}>
                  <p>
                    <span>Admin's profit</span>
                  </p>
                  <p>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalIncome * 0.1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className={cx("content-dashboard")}>
              <p>Top Companies</p>
              <CompanyChart datas={dataCompanyDashboardsByYear} />
            </div>
          </div>
          <div className={cx("main-content")}>
            <div className={cx("test")}>
              <p>Total income of system</p>
              <Barchart
                datas={dataDashboardsByYear}
                title="one month total income"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
