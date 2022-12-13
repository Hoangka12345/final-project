import React, { useContext } from "react";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";

import Layout from "../../components/Layout";
import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";

const cx = classNames.bind(styles);

function HomePage(props) {
  //--------useContext----------
  const { loading } = useContext(LoadingContext);

  return loading ? (
    <Progress />
  ) : (
    <Layout>
      <div className={cx("wrapper")}>
        <div className={cx("title")}>
          <p>Well come to Admin Page</p>
        </div>
        <div className={cx("icon")}>
          <SettingsRoundedIcon className={cx("home-icon")} sx={{ fontSize: "8rem", mt: 3 }} />
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
