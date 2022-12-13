import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import styles from "./SliceVideo.module.scss";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import video1 from "../../../../../assets/slide1.mp4";
import video2 from "../../../../../assets/slide2.mp4";
import video3 from "../../../../../assets/slide3.mp4";
import video4 from "../../../../../assets/slide4.mp4";

const cx = classNames.bind(styles);

const videos = [video1, video2, video3, video4];

function SlideVideo(props) {
  return (
    <Swiper
      cssMode={true}
      pagination={{
        clickable: true,
        bulletClass: cx(`swiper-pagination-bullet ${cx("pagination")}`),
      }}
      modules={[Pagination]}
      style={{ height: "65rem" }}
      loop={true}
      loopFillGroupWithBlank={true}
    >
      {videos &&
        videos.map((video, index) => (
          <SwiperSlide key={index}>
            <video src={video} loop autoPlay muted className={cx("video")}></video>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default SlideVideo;
