import React from "react";

import { LinearProgress } from "@mui/material";

import styles from "./Progress.module.scss";
import classNames from "classnames/bind";

import progress from "../../assets/progress.png";

const cx = classNames.bind(styles);

function Progress(props) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("progress")}>
        <div className={cx("plane")}>
          <img src={progress} alt="" />
        </div>
        <LinearProgress variant="indeterminate" />
      </div>
    </div>
  );
}

export default Progress;
