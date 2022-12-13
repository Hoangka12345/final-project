import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

import styles from "./FamousPlace.module.scss";
import classNames from "classnames/bind";
import { Button } from "@mui/material";

import { LoadingContext } from "../../../../Context/LoadingContext";

const cx = classNames.bind(styles);

function FamousPlace(props) {
  // ----------props------------
  const { data } = props;

  // ----------useContext--------------------------
  const { setLoading } = useContext(LoadingContext);

  // ------------router-dom---------------------
  const navigate = useNavigate();

  // ----------handle when user click view more button----------
  const handleClickViewMore = (key) => {
    navigate({
      pathname: "/tours",
      search: queryString.stringify({ _key: key }),
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("image")}>
        <img src={data.thumbnail} />
        <div className={cx("info")}>
          <div className={cx("content")}>
            <div className={cx("title")}>{data.title}</div>
            <Button
              size="large"
              variant="contained"
              sx={{ backgroundColor: "#daa15e", ":hover": { backgroundColor: "#d28731" } }}
              onClick={() => handleClickViewMore(data.key)}
            >
              View more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamousPlace;
