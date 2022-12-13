import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import styles from "./Slide.module.scss";
import classNames from "classnames/bind";

import { URL_THUMBNAIL } from "../../../../../../components/Constants";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const cx = classNames.bind(styles);

function Slide(props) {
  // ----------props---------
  const { tour } = props;
  const thumbnails = tour.thumbnail ? tour.thumbnail : [];

  // ---------------state-------------------
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);

  // ----------useRef - navigation------------
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  // ----------handle when index is changed ----------
  useEffect(() => {
    setActive(index);
    setThumbsSwiper();
  }, [index]);

  // ------------handle click prev button-------------
  const handleClickPrev = () => {
    if (index - 1 < 0) {
      setIndex(thumbnails.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  // ------------handle click next button-------------
  const handleClickNext = () => {
    if (index + 1 >= thumbnails.length) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("thumbnail")}>
        <Swiper
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={cx("mySwiper2")}
        >
          <SwiperSlide>
            <img src={`${URL_THUMBNAIL}/${thumbnails[index]}`} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={cx("slide")}>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          slidesPerView={thumbnails.length >= 4 ? 4 : thumbnails.length}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          className={cx("mySwiper")}
        >
          {thumbnails.map((slide, index) => {
            return (
              <SwiperSlide
                key={index}
                className={cx("swiper-slide")}
                onClick={() => {
                  setActive(index);
                  setIndex(index);
                }}
              >
                <div
                  className={
                    active === index
                      ? cx("slide-thumbnail", "active")
                      : cx("slide-thumbnail")
                  }
                >
                  <img src={`${URL_THUMBNAIL}/${slide}`} alt="" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={cx("navigation")}>
          <div
            className={cx("navigation-btn")}
            onClick={handleClickNext}
            ref={navigationNextRef}
          >
            <NavigateNextIcon className={cx("navigation-icon")} />
          </div>
          <div
            className={cx("navigation-btn")}
            onClick={handleClickPrev}
            ref={navigationPrevRef}
          >
            <NavigateBeforeIcon className={cx("navigation-icon")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide;
