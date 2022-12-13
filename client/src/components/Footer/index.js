import React from "react";

import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const cx = classNames.bind(styles);

function Footer(props) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Grid container>
          <Grid item md={4} xs={6}>
            <ul className={cx("list")}>
              <li>Vietnam Travel</li>
              <li>We always try to bring</li>
              <li>the best services for visitors</li>
              <li>with dedication and enthusiasm</li>
            </ul>
          </Grid>
          <Grid item md={4} xs={6} sx={{ textAlign: "center" }}>
            <ul className={cx("list")}>
              <li>Donors</li>
              <li>Pho Kingdom</li>
              <li>Lote Cafe</li>
              <li>Rice Viet</li>
            </ul>
          </Grid>
          <Grid item md={4} xs={12} sx={{ textAlign: "center" }}>
            <ul className={cx("list", "contact")}>
              <li>Follow us</li>
              <li>
                <span>Facebook</span>
                <FontAwesomeIcon icon={faSquareFacebook} />
              </li>
              <li>
                <span>Instagram</span>
                <FontAwesomeIcon icon={faSquareInstagram} />
              </li>
              <li>
                <span>Tiktok</span>
                <FontAwesomeIcon icon={faTiktok} />
              </li>
            </ul>
          </Grid>
          <Grid item xs={12}>
            <div className={cx("author")}>
              Created By
              <span> Mr.Hoang </span>| Hoangpbgch190102@fpt.edu.vn
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
