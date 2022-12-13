import React from "react";

import { TextField } from "@mui/material";

import styles from "./Input.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Input(props) {
  return (
    <TextField
      {...props}
      color="info"
      fullWidth
      className={cx("text-field")}
      FormHelperTextProps={{ style: { fontSize: "1.2rem", fontStyle: "italic" } }}
    />
  );
}

export default Input;
