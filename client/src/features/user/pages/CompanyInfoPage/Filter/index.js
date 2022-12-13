import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { unset } from "lodash";
import { useSnackbar } from "notistack";

import { Checkbox, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./Filter.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Filter(props) {
  const { queryParams, setTours } = props;

  // ----------state-----------
  const [searchValue, setSearchValue] = useState("");
  const [increase, setIncrease] = useState(false);
  const [decrease, setDecrease] = useState(false);
  const [check, setCheck] = useState({
    Northern: false,
    Central: false,
    Southern: false,
  });

  // ---------router-dom--------------
  const [searchParams, setSearchParams] = useSearchParams();

  // ----------useSnackbar----------------
  const { enqueueSnackbar } = useSnackbar();

  // ------------handle search real time----------------
  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
    setSearchParams({ ...queryParams, key: e.target.value });
  };

  // -------------handle when user click search icon----------------------
  const handleClickSearch = () => {
    if (searchValue != "") {
      unset(queryParams, "Northern");
      unset(queryParams, "Central");
      unset(queryParams, "Southern");
      setSearchParams({ ...queryParams, key: searchValue });
    } else {
      unset(queryParams, "key");
      enqueueSnackbar("please enter place you want to go!", {
        variant: "error",
      });
    }
  };

  // ----------handle when user enter keyboard to search--------------------
  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      handleClickSearch();
    }
  };

  // ----------handle when user click 'price from low to hight----------------
  const handleClickIncrease = () => {
    setIncrease(true);
    setDecrease(false);
    setSearchParams({ ...queryParams, _price: "asc" });
  };

  // ----------handle when user click 'price from height to low----------------
  const handleClickDecrease = () => {
    setDecrease(true);
    setIncrease(false);
    setSearchParams({ ...queryParams, _price: "desc" });
  };

  // -------------------handle when user check region sort--------------------
  const handleChangeChecked = (e, value, label) => {
    if (e.target.checked) {
      if (searchParams.get("key")) {
        unset(queryParams, "key");
        setCheck((prev) => ({ ...prev, [value]: true }));
        setSearchParams({ ...queryParams, [value]: label });
      } else {
        setCheck((prev) => ({ ...prev, [value]: true }));
        setSearchParams({ ...queryParams, [value]: label });
      }
    } else {
      setCheck((prev) => ({ ...prev, [value]: false }));
      if (searchParams.get(value)) {
        searchParams.delete(value);
        setSearchParams(searchParams);
      }
    }
  };

  // ------------------handle whrn user change params---------------------
  useEffect(() => {
    const handleChangeSearchParams = () => {
      if (!searchParams.get("key")) {
        setSearchValue("");
      }
    };

    const handleChangePriceParams = () => {
      if (searchParams.get("_price") === "asc") {
        setIncrease(true);
        setDecrease(false);
      } else if (searchParams.get("_price") === "desc") {
        setDecrease(true);
        setIncrease(false);
      }
    };

    const handleChangeRegionParams = () => {
      setCheck({
        Northern: searchParams.get("Northern") ? true : false,
        Central: searchParams.get("Central") ? true : false,
        Southern: searchParams.get("Southern") ? true : false,
      });
    };

    handleChangeSearchParams();
    handleChangePriceParams();
    handleChangeRegionParams();
  }, [searchParams]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-filter")}>
        <div className={cx("search")}>
          <input
            type="text"
            value={searchValue}
            onChange={handleChangeSearchValue}
            onKeyDown={handleEnterSearch}
          />
          <SearchIcon
            className={cx("search-icon")}
            onClick={handleClickSearch}
          />
        </div>
      </div>

      <div className={cx("price-sort")}>
        <p>Sort by price</p>
        <div className={cx("price")}>
          <Chip
            label="price low to high"
            color={increase ? "info" : "default"}
            sx={{ fontSize: "1.6rem", width: "80%" }}
            onClick={handleClickIncrease}
          />
          <Chip
            label="price high to low"
            color={decrease ? "info" : "default"}
            sx={{ fontSize: "1.6rem", mt: 2, width: "80%" }}
            onClick={handleClickDecrease}
          />
        </div>
      </div>

      <div className={cx("region-filter")}>
        <p>Sort by region</p>
        <div className={cx("region")}>
          <ul>
            <li>
              <Checkbox
                checked={check.Northern}
                size="large"
                onChange={(e) =>
                  handleChangeChecked(e, "Northern", "Northern Vietnam")
                }
              />
              <p>Northern Vietnam</p>
            </li>
            <li>
              <Checkbox
                checked={check.Central}
                size="large"
                onChange={(e) =>
                  handleChangeChecked(e, "Central", "Central Vietnam")
                }
              />
              <p>Central Vietnam</p>
            </li>
            <li>
              <Checkbox
                checked={check.Southern}
                size="large"
                onChange={(e) =>
                  handleChangeChecked(e, "Southern", "Southern Vietnam")
                }
              />
              <p>Southern Vietnam</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Filter;
