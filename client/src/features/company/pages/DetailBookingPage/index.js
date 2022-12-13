import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import queryString from "query-string";
import { useSnackbar } from "notistack";

import styles from "./DetailBookingPage.module.scss";
import classNames from "classnames/bind";

import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";
import request from "../../../../Utils/request";
import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";

const cx = classNames.bind(styles);

const DetailBooking = () => {
  // --------state----------
  const [booking, setBooking] = useState({});
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // --------context-------
  const { loading } = useContext(LoadingContext);

  // --------router-dom----------
  const location = useLocation();
  const navigate = useNavigate();

  // --------snackbar-----------
  const { enqueueSnackbar } = useSnackbar();

  // --------memo----------
  const params = useMemo(() => {
    setConfirm(!confirm);
    return queryString.parse(location.search)._id;
  }, [location.search]);

  const duration = useMemo(() => {
    return moment
      .duration(
        moment(booking.timeOut, "MM-DD-YYYY").diff(
          moment(booking.timeStart, "MM-DD-YYYY")
        )
      )
      .asDays();
  }, [booking.timeStart]);

  // --------handle set state booking-------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("company/booking/show");
        if (res.status === 200) {
          const newBooking = res.data.bookings.filter(
            (booking) => booking._id === params
          )[0];
          if (newBooking) {
            setBooking(newBooking);
          }
        }
      } catch (error) {}
    })();
  }, [confirm]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmTour = async () => {
    try {
      const res = await request.put(`company/booking/auth/${params}`);
      if (res.status === 200) {
        handleClose();
        setConfirm(!confirm);
        enqueueSnackbar("you confirmed this order successfully!", {
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Progress />
  ) : (
    <>
      <Header />

      <div className={cx("wrapper")}>
        <Paper
          sx={{
            width: "80%",
            margin: "2rem auto",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            padding: "0 1rem 2rem",
          }}
        >
          <h2 className={cx("title")}>Booking's information</h2>
          <div className={cx("main_content")}>
            <div className={cx("content")}>
              <div className={cx("info")}>
                <span>name of tour:</span>
                <span>{booking.tour && booking.tour[0].title}</span>
              </div>
              <div className={cx("info")}>
                <span>Duration:</span>
                <span>{duration}</span>
                <span>{duration > 1 ? "days" : "day"}</span>
              </div>
              <div className={cx("info")}>
                <span>Departure day:</span>
                <span>{booking.timeStart && booking.timeStart}</span>
              </div>
              <div className={cx("info")}>
                <span>End date:</span>
                <span>{booking.timeOut && booking.timeOut}</span>
              </div>
              <div className={cx("info")}>
                <span>Booking date:</span>
                <span>
                  {booking.createdAt &&
                    moment(booking.createdAt).format("MM-DD-YYYY")}
                </span>
              </div>
              <div className={cx("info")}>
                <span>price of tour:</span>
                <span>
                  {booking.price &&
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(booking.price / booking.numberTicket)}
                </span>
              </div>
            </div>
            <div className={cx("content")}>
              <div className={cx("info_user")}>
                <span>Customer's name:</span>
                <span>{booking.user && booking.user[0].username}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Customer's email:</span>
                <span>{booking.user && booking.user[0].email}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Customer's number:</span>
                <span>{booking.phoneNumber && booking.phoneNumber}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Customer's address:</span>
                <span>{booking.address && booking.address}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Number of tickets:</span>
                <span>{booking.numberTicket && booking.numberTicket}</span>
                <span>{booking.numberTicket > 1 ? "tickets" : "ticket"}</span>
              </div>
              <div className={cx("info_user")}>
                <span>Total price:</span>
                <span>
                  {booking.price &&
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(booking.price)}
                </span>
              </div>
            </div>
          </div>

          {booking.auth == 0 && (
            <div className={cx("btn_confirm")}>
              <Button
                variant="contained"
                sx={{ fontSize: "1.6rem", mt: "4rem" }}
                onClick={() => handleClickOpen()}
              >
                Confirm booking
              </Button>
            </div>
          )}
        </Paper>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
        >
          {"Confirm Booking tour..."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "1.6rem" }}
          >
            If you agree to confirm this order, you are responsible for
            performing the services according to what you have posted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            variant="outlined"
            sx={{ fontSize: "1.2rem", mr: 2 }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => handleConfirmTour()}
            variant="contained"
            sx={{ fontSize: "1.2rem", mr: 2 }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default DetailBooking;
