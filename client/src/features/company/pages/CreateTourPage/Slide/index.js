import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import styles from "./Slide.module.scss";
import classNames from "classnames/bind";

import { TourContext } from "../index";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const cx = classNames.bind(styles);

function Slide(props) {
  const { setThumbnails } = useContext(TourContext);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const [slides, setSlides] = useState([]);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const slideList = useRef([]);

  useEffect(() => {
    setActive(index);
    setThumbsSwiper();
  }, [index]);

  useEffect(() => {
    for (let i = 0; i < files.length; i++) {
      setThumbnails((prev) => [...prev, files[i]]);
      slideList.current[i] = URL.createObjectURL(files[i]);
      setSlides([...slideList.current]);
      URL.revokeObjectURL(files[i]);
    }
  }, [files]);

  const handleClickPrev = () => {
    if (index - 1 < 0) {
      setIndex(slides.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  const handleClickNext = () => {
    if (index + 1 >= slides.length) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const handleChangeFile = (e) => {
    setThumbnails([]);
    setFiles(e.target.files);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("thumbnail")}>
        <Swiper
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={cx("mySwiper2")}
        >
          <SwiperSlide>
            <img
              src={
                slides.length > 0
                  ? slides[index]
                  : "https://static.toiimg.com/thumb/msid-91025208,width-748,height-499,resizemode=4,imgsize-143956/Explore-the-culturally-rich-and-stunning-Vietnam.jpg"
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
          slidesPerView={slides.length >= 4 ? 4 : slides.length}
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
          {slides.map((slide, index) => {
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
                    active === index ? cx("slide-thumbnail", "active") : cx("slide-thumbnail")
                  }
                >
                  <img src={slide} alt="" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={cx("navigation")}>
          <div className={cx("navigation-btn")} onClick={handleClickNext} ref={navigationNextRef}>
            <NavigateNextIcon className={cx("navigation-icon")} />
          </div>
          <div className={cx("navigation-btn")} onClick={handleClickPrev} ref={navigationPrevRef}>
            <NavigateBeforeIcon className={cx("navigation-icon")} />
          </div>
        </div>
      </div>

      <label className={cx("choose-file")}>
        <div className={cx("image-icon")}>
          <AddPhotoAlternateIcon sx={{ fontSize: "4.5rem", color: "#4a4ac1" }} />
        </div>
        <input type="file" multiple onChange={handleChangeFile} />
        <p>choose image to make your slide</p>
      </label>
    </div>
  );
}

export default Slide;
