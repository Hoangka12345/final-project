import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import styles from "./SlideCompany.module.scss";
import classNames from "classnames/bind";

import request from "../../../../../Utils/request";
import { URL_AVT } from "../../../../../components/Constants";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const cx = classNames.bind(styles);

function SlideCompany(props) {
  // --------state--------------
  const [companies, setCompanies] = useState([]);

  // -----------router-dom------------
  const navigate = useNavigate();

  // --------call api get all companies-------------
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const res = await request.get("/tour/showcompany");
        if (res.status === 200) {
          setCompanies(res.data.companies);
        }
      } catch (error) {}
    };

    getCompanies();
  }, []);

  // --------handle when user click a company ----------------
  const handleNavigateToCompany = (id) => {
    navigate({
      pathname: "/company-introduction",
      search: queryString.stringify({ _id: id }),
    });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>Companies are cooperating</div>
      <div className={cx("slide-list")}>
        <Swiper
          breakpoints={{
            400: {
              slidesPerView: 2,
            },
            // when window width is >= 640px
            600: {
              slidesPerView: 3,
            },
            // when window width is >= 768px
            1000: {
              slidesPerView: 4,
            },
            // when window width is >= 1200px
            1200: {
              slidesPerView: 5,
            },
          }}
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
          {companies.length > 0 &&
            companies.map((company) => {
              return (
                <SwiperSlide key={company._id}>
                  <div className={cx("slide-item")}>
                    <div
                      className={cx("slide-avt")}
                      onClick={() => handleNavigateToCompany(company._id)}
                    >
                      <img src={company && `${URL_AVT}/${company.avatar}`} alt="" />
                    </div>
                    <p>{company.username}</p>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default SlideCompany;
