import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

import { Button, FormControl, MenuItem, Paper, TextField, Stack, Select } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import styles from "./Booking.module.scss";
import classNames from "classnames/bind";

import { LoadingContext } from "../../../../../Context/LoadingContext";

const cx = classNames.bind(styles);

function Booking(props) {
  // --------props----------
  const { id } = props;

  // ---------state---------
  const [dateValue, setDateValue] = useState(new Date());
  const [customerNumber, setCustomerNumber] = useState("1");

  // --------------context---------
  const { setLoading } = useContext(LoadingContext);

  // ------------router-dom---------
  const navigate = useNavigate();

  // -------------useSnackbar---------
  const { enqueueSnackbar } = useSnackbar();

  // ------------cookie---------
  const [cookie, setCookie, removeCookie] = useCookies();

  // ----handle save value when user change date start----
  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
  };

  // ----handle click event when user click to "Book Tour"-----
  const handleBooking = () => {
    if (!cookie["token"] || cookie["role"] != 1) {
      enqueueSnackbar("please login before booking!", { variant: "error" });
      return;
    }
    const day = dateValue.getDate() < 10 ? `0${dateValue.getDate()}` : `${dateValue.getDate()}`;
    const month =
      dateValue.getMonth() < 9 ? `0${dateValue.getMonth() + 1}` : `${dateValue.getMonth() + 1}`;
    const year = `${dateValue.getFullYear()}`;
    const date = month + "-" + day + "-" + year;
    navigate({
      pathname: "/check-out",
      search: queryString.stringify({
        _date: date,
        _ticket: customerNumber,
        _id: id,
      }),
    });
  };

  return (
    <div className={cx("wrapper")}>
      <Paper className={cx("container")} sx={{ backgroundColor: "#011e41" }}>
        <div className={cx("old-price")}>
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(2990000)}
        </div>
        <div className={cx("new-price")}>
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(1000000)}
        </div>

        <form action="">
          <div className={cx("time-start")}>
            <div className={cx("title")}>Date Start:</div>
            <div className={cx("adapter")}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DesktopDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={dateValue}
                    onChange={handleChangeDate}
                    renderInput={(params) => (
                      <TextField {...params} className={cx("adapter-input")} />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </div>

          <div className={cx("customer")}>
            <div className={cx("title")}>Customer:</div>
            <div className={cx("select")}>
              <FormControl fullWidth>
                <Select
                  value={customerNumber}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => {
                    setCustomerNumber(e.target.value);
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    fontSize: "1.6rem",
                    label: { color: "#333", fontWeight: "bold" },
                  }}
                >
                  <MenuItem value={1}>1 người</MenuItem>
                  <MenuItem value={2}>2 người</MenuItem>
                  <MenuItem value={3}>3 người</MenuItem>
                  <MenuItem value={4}>4 người</MenuItem>
                  <MenuItem value={5}>5 người</MenuItem>
                  <MenuItem value={6}>6 người</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <Button
            fullWidth
            variant="contained"
            sx={{
              fontSize: "1.6rem",
              fontWeight: "600",
              mt: 2,
              backgroundColor: "#ffc600",
              color: "#000",
              "&:hover": { backgroundColor: "#e0ae00" },
            }}
            onClick={() => handleBooking()}
          >
            Book tour
          </Button>
        </form>
      </Paper>

      <Paper className={cx("contact")}>
        <div className={cx("contact-title")}>Consultation call center</div>
        <div className={cx("contact-content")}>
          <div className={cx("contact-item")}>Any questions you have</div>
          <div className={cx("contact-item")}>
            <span>please call </span>
            <span>1900 3398</span>
          </div>
          <div className={cx("contact-item")}>We support 24/7</div>
        </div>
      </Paper>
    </div>
  );
}

export default Booking;
