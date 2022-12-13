import React, { useContext } from "react";

import { Grid, TextField } from "@mui/material";
import NumberFormat from "react-number-format";

import styles from "./Price.module.scss";
import classNames from "classnames/bind";

import { TourContext } from "../../index";

const cx = classNames.bind(styles);

function Price(props) {
  const { price, setPrice, saleOff, setSaleOff } = useContext(TourContext);

  return (
    <>
      <Grid item xs={6}>
        <NumberFormat
          variant="outlined"
          thousandSeparator={true}
          value={price}
          suffix=" đ"
          customInput={TextField}
          fullWidth
          label="Price"
          className={cx("text-field")}
          onValueChange={(values) => {
            setPrice(values.value);
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <NumberFormat
          variant="outlined"
          thousandSeparator={true}
          value={saleOff}
          suffix=" %"
          customInput={TextField}
          fullWidth
          label="Sale off"
          className={cx("text-field")}
          onValueChange={(values) => {
            setSaleOff(values.value);
          }}
        />
      </Grid>
    </>
  );
}

export default Price;
