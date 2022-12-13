import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";

import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import Tour from "../../components/Tour";
import SlideVideo from "./SlideVideo";
import FamousPlace from "../../components/FamousPlace";

import { famousPlaces, tourismTypes } from "../../../../components/Data";
import SlideCompany from "./SlideCompany";
import request from "../../../../Utils/request";
import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const cx = classNames.bind(styles);

function HomePage(props) {
  // ----------------state----------
  const [searchValue, setSearchValue] = useState("");
  const [tours, setTours] = useState([]);

  // --------context-------
  const { loading } = useContext(LoadingContext);

  // --------router-dom----------
  const navigate = useNavigate();

  // --------call api to get all tours-----------
  useEffect(() => {
    const getTours = async () => {
      try {
        const res = await request.get("/tour/show");
        if (res.status === 200) {
          setTours(res.data.tours);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTours();
  }, []);

  // --------handle click search icon----------
  const handleSearch = () => {
    navigate({
      pathname: "/tours",
      search: queryString.stringify({ _key: searchValue }),
    });
  };

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return loading ? (
    <Progress />
  ) : (
    <div>
      <Header />
      <div className={cx("wrapper")}>
        <SlideVideo />
        <div className={cx("container")}>
          <div className={cx("search")}>
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => handleEnterSearch(e)}
            />
            <div className={cx("search-icon")} onClick={() => handleSearch()}>
              <SearchIcon sx={{ fontSize: "3rem" }} />
            </div>
          </div>
          <div className={cx("favourite-tour")}>
            <div className={cx("title")}>Top tours are most interested</div>
            <div className={cx("favourite-tour__wrapper")}>
              <Swiper
                breakpoints={{
                  // when window width is >= 640px
                  0: {
                    slidesPerView: 1,
                  },
                  // when window width is >= 640px
                  600: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  1000: {
                    slidesPerView: 3,
                  },
                  // when window width is >= 768px
                  1200: {
                    slidesPerView: 4,
                  },
                }}
                // slidesPerView={4}
                spaceBetween={20}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                modules={[Autoplay]}
                speed={2500}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {tours.length > 0 &&
                  tours.map((tour) => {
                    return (
                      <SwiperSlide key={tour._id}>
                        <Tour tour={tour} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>

          <div className={cx("famous-place")}>
            <div className={cx("title")}>Best Places to Visit in Vietnam</div>
            <div className={cx("favourite-tour__wrapper")}>
              <Grid container spacing={2}>
                {famousPlaces.map((data, index) => {
                  return (
                    <Grid item lg={4} sm={6} xs={12} key={index}>
                      <FamousPlace data={data} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>

          <div className={cx("tourism-type")}>
            <div className={cx("title")}>Popular types of tourism</div>
            <div className={cx("tourism-type__wrapper")}>
              <Grid container spacing={4}>
                {tourismTypes.map((data, index) => {
                  return (
                    <Grid item sm={6} xs={12} key={index}>
                      <FamousPlace data={data} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>

          <SlideCompany />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
