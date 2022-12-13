import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { Paper } from "@mui/material";

import styles from "./CompanyInfoDetail.module.scss";
import classNames from "classnames/bind";

import Layout from "../../components/Layout";
import Actions from "./Actions";
import request from "../../../../Utils/request";
import { URL_AVT } from "../../../../components/Constants";

const cx = classNames.bind(styles);

function CompanyInfoDetail(props) {
  // --------state----------
  const [company, setCompany] = useState({});
  const [isVerified, setIsVerified] = useState(false);

  // --------router-dom----------
  const location = useLocation();

  // --------useRed----------
  const params = useRef(queryString.parse(location.search)._id);

  // --------call api get user info --------------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get(`/admin/user/showcompanydetail/${params.current}`);
        if (res.status === 200) {
          const companyInfo = res.data.company[0];
          setCompany(companyInfo);
          console.log(companyInfo);
          if (companyInfo.info[0].auth) {
            setIsVerified(false);
          } else {
            setIsVerified(true);
          }
        }
      } catch (error) {}
    })();
  }, []);

  // --------------useMemo---------
  const booked = useMemo(() => {
    const numberBooked = [];
    if (company.tours) {
      company.tours.map((tour) => {
        numberBooked.push(tour.booked.length);
      });
    }
    return numberBooked.reduce((sum, number) => {
      return sum + number;
    }, 0);
  }, [company]);

  return (
    <Layout>
      <div className={cx("wrapper")}>
        <Paper sx={{ width: "100%", height: "100%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
          <div className={cx("container")}>
            <div className={cx("avatar")}>
              <img
                src={
                  company.avatar
                    ? `${URL_AVT}/${company.avatar}`
                    : "https://qph.cf2.quoracdn.net/main-qimg-9f2469505de3ed568ef66f87e8aa9ebd-lq"
                }
                alt=""
              />
            </div>
            <div className={cx("user-info")}>
              <div className={cx("main-info")}>
                <div className={cx("title")}>User name</div>
                <div className={cx("content")}>{company.username && company.username}</div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Email</div>
                <div className={cx("content")}>{company.email && company.email}</div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Phone number</div>
                <div className={cx("content")}>{company.phoneNumber && company.phoneNumber}</div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Address</div>
                <div className={cx("content")}>
                  {company.info &&
                    company.info[0].address.map((data) => {
                      return <div key={data}>{data}</div>;
                    })}
                </div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Number of tours</div>
                <div className={cx("content")}>{company.tours && company.tours.length}</div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Number of tours booked</div>
                <div className={cx("content")}>{booked}</div>
              </div>
              <div className={cx("main-info")}>
                <div className={cx("title")}>Success rate of tour</div>
                <div className={cx("content")}>100%</div>
              </div>
              <div className={cx("main-info")}>
                <Actions isVerified={isVerified} />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </Layout>
  );
}

export default CompanyInfoDetail;
