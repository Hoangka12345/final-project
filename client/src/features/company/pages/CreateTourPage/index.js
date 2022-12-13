import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { Grid } from "@mui/material";

import styles from "./CreateTourPage.module.scss";
import classNames from "classnames/bind";

import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import CreateForm from "./CreateForm";
import Slide from "./Slide";
import Note from "./Note";
import request from "../../../../Utils/request";
import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";

const cx = classNames.bind(styles);

export const TourContext = createContext();

function CreateTourPage(props) {
  // --------state--------------
  const [thumbnails, setThumbnails] = useState([]);
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [introDetail, setIntroDetail] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [transport, setTransport] = useState("");
  const [time, setTime] = useState("1 days 1 nights");
  const [Programs, setPrograms] = useState([]);
  const [category, setCategory] = useState("");
  const [totalTour, setTotalTour] = useState("");
  const [price, setPrice] = useState("");
  const [saleOff, setSaleOff] = useState("");

  // --------get loading from loading context-----------
  const { loading } = useContext(LoadingContext);

  // --------router-dom----------
  const navigate = useNavigate();

  // --------snackbar----------------
  const { enqueueSnackbar } = useSnackbar();

  // --------set value for context of tour
  const value = {
    setThumbnails,
    title,
    setTitle,
    region,
    setRegion,
    city,
    setCity,
    departureTime,
    setDepartureTime,
    introduction,
    setIntroduction,
    setIntroDetail,
    services,
    setServices,
    setServiceList,
    transport,
    setTransport,
    time,
    setTime,
    Programs,
    setPrograms,
    category,
    setCategory,
    totalTour,
    setTotalTour,
    price,
    setPrice,
    saleOff,
    setSaleOff,
  };

  // --------handle submit create tour-------------
  const handelCreateTour = async () => {
    if (thumbnails[0]) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("city", city);
      formData.append("region", region);
      formData.append("time", time);
      formData.append("dateStart", departureTime);
      formData.append("code", "GCH190102");
      formData.append("transport", transport);
      formData.append("introduction", introduction);
      formData.append("service", JSON.stringify(serviceList));
      formData.append("program", JSON.stringify(Programs));
      formData.append("price", price);
      formData.append("avaiableTour", totalTour);
      formData.append("totalTour", totalTour);
      formData.append("saleOff", saleOff);
      formData.append("category", category);
      formData.append("accompanyingService", JSON.stringify(services));
      formData.append("introContent", JSON.stringify(introDetail));
      thumbnails.forEach((thumbnail) => {
        formData.append("thumbnail", thumbnail);
      });
      try {
        const res = await request.post("/company/tour/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200) {
          enqueueSnackbar("Successfully created new tour, please wait for admin to confirm!", {
            variant: "success",
          });
          navigate("/company");
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.response.data.Message, {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("please choose at least a photo for tour!", {
        variant: "error",
      });
    }
  };

  return loading ? (
    <Progress />
  ) : (
    <TourContext.Provider value={value}>
      <div>
        <Header />

        <div className={cx("wrapper")}>
          <div className={cx("container")}>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <Slide />
              </Grid>

              <Grid item xs={7}>
                <CreateForm handelCreateTour={handelCreateTour} />
              </Grid>

              <Grid item xs={12}>
                <Note />
              </Grid>
            </Grid>
          </div>
        </div>

        <Footer />
      </div>
    </TourContext.Provider>
  );
}

export default CreateTourPage;
