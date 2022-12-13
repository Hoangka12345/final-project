import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useSnackbar } from "notistack";
import moment from "moment";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./CheckOutPage.module.scss";
import classNames from "classnames/bind";

import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import Order from "./Order";
import Address from "./Address";
import CardInfo from "./CardInfo";
import Overview from "./Overview";
import { CheckOutContext } from "../../../../Context/CheckOutContext";
import { LoadingContext } from "../../../../Context/LoadingContext";
import request from "../../../../Utils/request";
import Process from "../../../../components/Progress";

const cx = classNames.bind(styles);

const steps = [
  "user's information",
  "card's information",
  "confirm information",
];

export default function CheckOutPage() {
  // --------state----------
  const [tour, setTour] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  // --------context----------
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
  } = useContext(CheckOutContext);
  const { loading } = useContext(LoadingContext);

  // -----------router-dom------------
  const location = useLocation();

  // ------------useRef--------------
  const params = useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  // --------snackbar-----------
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpenDialogConfirm(true);
  };

  const handleClose = () => {
    setOpenDialogConfirm(false);
  };

  const handleNext = (activeStep) => {
    if (activeStep == 0) {
      if (name === "" || email === "" || phone === "" || address == "") {
        enqueueSnackbar("please enter full fields!", { variant: "error" });
        setActiveStep(0);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep >= 2) {
      setActiveStep(2);
      handleClickOpen();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // -----------call api get customer info and tour info--------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get();
        if (res.status === 200) {
          const data = res.data.user;
          setName(data.username);
          setEmail(data.email);
          setPhone(data.phoneNumber);
        }
      } catch (error) {}
    })();

    (async () => {
      try {
        const res = await request.get(`/tour/show/${params._id}`);
        if (res.status === 200) {
          setTour(res.data.tour[0]);
        }
      } catch (error) {}
    })();
  }, []);

  //--------handle time out of tour--------------------------
  moment.addRealMonth = function addRealMonth(d) {
    const time = tour.time && parseInt(tour.time.split(" ")[0]);
    const fm = moment(d).add(time, "days");
    const fmEnd = moment(fm).endOf("month");
    return d.date() != fm.date() && fm.isSame(fmEnd.format("MM-DD-YYYY"))
      ? fm.add(1, "d")
      : fm;
  };

  const timeStart = useRef(moment(params._date).format("MM-DD-YYYY"));
  const timeOut = moment
    .addRealMonth(moment(params._date))
    .format("MM-DD-YYYY");

  // -----------memo-------------
  const price = useMemo(() => {
    return tour?.price * params._ticket;
  }, [tour, params._ticket]);

  const pricePaypal = useMemo(() => {
    const paypal = (price / 23000) * 0.1;
    return paypal.toFixed(2);
  }, [price]);

  // --------handle payment--------
  const handlePayment = async (name) => {
    const data = {
      tourId: params._id,
      address,
      phoneNumber: phone,
      numberTicket: params._ticket,
      timeStart: timeStart.current,
      timeOut: timeOut,
      price: price,
    };
    try {
      const res = await request.post("/booking/add", data);
      if (res.status === 200) {
        enqueueSnackbar(
          "Successfully booked the tour, please wait for the company to confirm!",
          {
            variant: "success",
          }
        );
        setOpenDialogConfirm(false);
        setAddress("");
        setActiveStep(3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Process />
  ) : (
    <>
      <Header />

      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper
                sx={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  padding: "1rem 2rem",
                }}
              >
                <h1 className={cx("title")}>Confirm your info</h1>
                <Box sx={{ width: "100%" }}>
                  <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                      return (
                        <Step key={label}>
                          <StepLabel
                            sx={{
                              "& .MuiStepLabel-label": { fontSize: "1.6rem" },
                              "& .MuiStepIcon-root": { fontSize: "2.5rem" },
                              "& .MuiStepIcon-text": { fontSize: "1.6rem" },
                            }}
                          >
                            {label}
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <>
                    {activeStep === 0 ? (
                      <Address tour={tour} />
                    ) : activeStep === 1 ? (
                      <CardInfo />
                    ) : activeStep === 2 ? (
                      <Overview
                        tour={tour}
                        timeStart={timeStart.current}
                        timeOut={timeOut}
                      />
                    ) : (
                      <div className={cx("confirm-success")}>
                        You have successfully paid the deposit. Please check
                        your email within 48 hours for the company to confirm
                        your tour!
                      </div>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        pt: 2,
                      }}
                    >
                      <Button
                        color="inherit"
                        disabled={activeStep === 0 || activeStep > 2}
                        onClick={handleBack}
                        variant="contained"
                        sx={{ mr: 1, fontSize: "1.2rem" }}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={activeStep > 2}
                        color="info"
                        onClick={() => handleNext(activeStep)}
                        variant="contained"
                        sx={{ mr: 1, fontSize: "1.2rem" }}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Order tour={tour} />
            </Grid>
          </Grid>

          <Dialog
            open={openDialogConfirm}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ fontSize: "1.8rem", fontWeight: "500" }}
            >
              {"Confirm for payment..."}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                sx={{ fontSize: "1.6rem" }}
              >
                <p>
                  You need to pay 10% of the order value. After 5 days of
                  payment, if the company has no response, the system will
                  refund 100%.
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <IconButton
                onClick={handleClose}
                variant="outlined"
                sx={{
                  position: "absolute",
                  top: "-13rem",
                  right: "0.5rem",
                }}
              >
                <CloseIcon sx={{ fontSize: "2.5rem", fontWeight: "bold" }} />
              </IconButton>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AY1WwqVpPgYJ8mRwv82wc_B6v9Ndilp7Li7Bcbss6qPIipeKnRoOmZZCYI7XYYlvwKVrTjd0j5-dVixV",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: pricePaypal,
                            // value: "12",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const name = details.payer.name.given_name;
                      handlePayment(name);
                    });
                  }}
                />
              </PayPalScriptProvider>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      <Footer />
    </>
  );
}
