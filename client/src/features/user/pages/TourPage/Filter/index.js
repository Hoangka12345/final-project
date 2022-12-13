import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import NumberFormat from "react-number-format";
import { Box, Button, Checkbox, Slider, TextField } from "@mui/material";

import styles from "./Filter.module.scss";
import classNames from "classnames/bind";

import { tourismTypes } from "../../../../../components/Data";

const cx = classNames.bind(styles);

function Filter(props) {
  // ------------------props-----------------------
  const { queryParams } = props;

  // ------------------state--------------
  const [range, setRange] = useState("10");
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  const [gtePrice, setGtePrice] = useState("");
  const [ltePrice, setLtePrice] = useState("");
  const [categories, setCategories] = useState([]);

  // ----------router -dom--------------
  const [searchParams, setSearchParams] = useSearchParams();

  // ----------useSnackbar---------
  const { enqueueSnackbar } = useSnackbar();

  // ----------handle when user sort by range----------------
  const handleChangerange = (e) => {
    setRange(e.target.value);
    setSearchParams({ ...queryParams, _duration: e.target.value });
  };

  // ----------handle price filter --------------------
  const handleClickPriceFilter = () => {
    if (parseFloat(gtePrice) > parseFloat(ltePrice)) {
      enqueueSnackbar(
        "please enter first price filter less than second price filter!",
        {
          variant: "error",
        }
      );
    } else if (!gtePrice || !ltePrice) {
      enqueueSnackbar("please enter range of price which you want!", {
        variant: "error",
      });
    } else {
      if (parseFloat(gtePrice) == 0) {
        setSearchParams({ ...queryParams, _gte: "10", _lte: ltePrice });
      } else {
        setSearchParams({ ...queryParams, _gte: gtePrice, _lte: ltePrice });
      }
    }
  };

  // ----------handle check to choose categories filter --------------------
  const handleChooseCategories = (e, title) => {
    if (e.target.checked) {
      setCategories((prev) => [...prev, title]);
      // setSearchParams({ ...queryParams, [`${title}`]: title });
    } else {
      setCategories(categories.filter((data) => data !== title));
      // searchParams.delete(`${title}`);
      // setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    setSearchParams({ ...queryParams, _categories: categories });
  }, [categories.length]);

  // ----------handle when change params---------
  useEffect(() => {
    (() => {
      if (
        searchParams.get("key") === "Explore - experience" ||
        searchParams.get("key") === "Resort" ||
        searchParams.get("key") === "Team Bulding" ||
        searchParams.get("key") === "Culinary culture"
      ) {
        setDisableCheckbox(true);
      } else {
        setDisableCheckbox(false);
      }
    })();
  }, [searchParams.get("key")]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("duration-filter")}>
        <p>Search by duration of tour</p>
        <div className={cx("duration-filter__content")}>
          <Slider
            aria-label="Departure time"
            valueLabelDisplay="auto"
            value={range}
            step={1}
            marks
            min={1}
            max={20}
            onChange={handleChangerange}
            sx={{
              "& > span > span": {
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                fontWeight: 800,
              },
            }}
            // disabled={tours.length > 0 ? false : true}
          />
          <span>
            {parseInt(range) > 1 ? `less than ${range} days` : "1 day"}
          </span>
        </div>
      </div>

      <div className={cx("price-filter")}>
        <p>Search by Price</p>
        <div>
          <div className={cx("price-filter_content")}>
            <NumberFormat
              thousandSeparator={true}
              suffix={" đ"}
              customInput={TextField}
              fullWidth
              label="from"
              size="small"
              value={gtePrice}
              onValueChange={(values) => setGtePrice(values.value)}
            />
            <span> - </span>
            <NumberFormat
              thousandSeparator={true}
              suffix={" đ"}
              customInput={TextField}
              fullWidth
              label="to"
              size="small"
              value={ltePrice}
              onValueChange={(values) => setLtePrice(values.value)}
            />
          </div>
          <Box>
            <Button
              variant="outlined"
              sx={{ mb: 4 }}
              size="large"
              onClick={handleClickPriceFilter}
            >
              Search
            </Button>
          </Box>
        </div>
      </div>

      <div className={cx("category-filter")}>
        <p>Search by types of tourism</p>
        <div className={cx("category-filter__content")}>
          <ul>
            {tourismTypes.map((data) => {
              return (
                <li key={data.id}>
                  <Checkbox
                    size="large"
                    disabled={disableCheckbox}
                    onChange={(e) => handleChooseCategories(e, data.title)}
                  />
                  <p>{data.title}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Filter;
