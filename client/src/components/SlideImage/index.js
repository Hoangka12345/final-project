import React, { useRef } from "react";

import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import styles from "./SlideImage.module.scss";
import classNames from "classnames/bind";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { URL_THUMBNAIL } from "../Constants";

const cx = classNames.bind(styles);

const SlideImage = (props) => {
  // --------props-------------
  const {
    images,
    active,
    setActive,
    index,
    setIndex,
    handleClickPrev,
    handleClickNext,
    isChangeFiles,
    thumbsSwiper,
    setThumbsSwiper,
  } = props;

  // ---------useRef--------------
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <>
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
            <img
              src={
                !isChangeFiles
                  ? `${URL_THUMBNAIL}/${images[index]}`
                  : `${images[index]}`
              }
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={cx("slide")}>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          slidesPerView={images.length < 4 ? images.length : 4}
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
          {images?.map((image, index) => {
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
                  <img
                    src={
                      !isChangeFiles ? `${URL_THUMBNAIL}/${image}` : `${image}`
                    }
                    alt=""
                  />
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
    </>
  );
};

export default SlideImage;
