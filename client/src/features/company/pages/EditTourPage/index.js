import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import queryString from "query-string";

import { Grid } from "@mui/material";

import styles from "./EditTourPage.module.scss";
import classNames from "classnames/bind";

import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import EditForm from "./EditForm";
import Slide from "./Slide";
import request from "../../../../Utils/request";
import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";

const cx = classNames.bind(styles);

export const TourContext = createContext();

function EditTourPage(props) {
  // ------------state-------------------
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
  const [thumbnail, setThumbnail] = useState([]);
  const [thumbnailDisplay, setThumbnailDisplay] = useState([]);

  // --------get loading from loading context-----------
  const { loading } = useContext(LoadingContext);

  // -------------router-dom----------
  const location = useLocation();
  const navigate = useNavigate();

  // ----------useRef------------
  const tourId = useMemo(() => {
    return queryString.parse(location.search)._id;
  }, [location.search]);

  // ---------snackbar-----------
  const { enqueueSnackbar } = useSnackbar();

  // ------------call api set value for tour----------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get(`/company/tour/show/${tourId}`);
        console.log(res);
        if (res.status === 200) {
          const data = res.data.tour;
          setTitle(data.title);
          setRegion(data.region);
          setCity(data.city);
          setDepartureTime(data.dateStart);
          setIntroduction(data.introduction);
          setIntroDetail(data.introContent);
          setServices(data.accompanyingService);
          setServiceList(data.service);
          setTransport(data.transport);
          setTime(data.time);
          setPrograms(data.program);
          setCategory(data.category);
          setTotalTour(data.totalTour);
          setPrice(data.price);
          setSaleOff(data.saleOff);
          setThumbnailDisplay(data.thumbnail);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [tourId]);

  // --------set value for context of tour---------
  const value = {
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
    introDetail,
    setIntroDetail,
    services,
    setServices,
    serviceList,
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
    thumbnailDisplay,
    setThumbnailDisplay,
    setThumbnail,
  };

  // --------handle submit update tour-------------
  const handleEditTour = async () => {
    const formData = new FormData();
    formData.append("tourId", tourId);
    formData.append("title", title);
    formData.append("region", region);
    formData.append("city", city);
    formData.append("dateStart", departureTime);
    formData.append("code", "GCH190102");
    formData.append("introduction", introduction);
    formData.append(
      "introContent",
      JSON.stringify(introDetail.filter((data) => data !== ""))
    );
    formData.append("accompanyingService", JSON.stringify(services));
    formData.append(
      "service",
      JSON.stringify(serviceList.filter((data) => data !== ""))
    );
    formData.append("transport", transport);
    formData.append("time", time);
    formData.append(
      "program",
      JSON.stringify(Programs.filter((data) => data.content !== ""))
    );
    formData.append("category", category);
    formData.append("totalTour", totalTour);
    formData.append("avaiableTour", totalTour);
    formData.append("price", price);
    formData.append("saleOff", saleOff);
    if (thumbnail === []) return formData.append("thumbnail", thumbnail);
    else {
      thumbnail.forEach((thumbnail) => {
        formData.append("thumbnail", thumbnail);
      });
    }

    try {
      console.log(formData.getAll("thumbnail"));
      const res = await request.put("/company/tour/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        enqueueSnackbar("Update tour successfully !", {
          variant: "success",
        });
        navigate("/company");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.Message, {
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
                <EditForm handleEditTour={handleEditTour} />
              </Grid>
            </Grid>
          </div>
        </div>

        <Footer />
      </div>
    </TourContext.Provider>
  );
}

export default EditTourPage;
