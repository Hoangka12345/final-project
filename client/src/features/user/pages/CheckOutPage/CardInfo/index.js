import React from "react";

import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";

import styles from "./CardInfo.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const CardInfo = () => {
  return (
    <div className={cx("wrapper")}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Name of Card"
            fullWidth
            required
            inputProps={{ style: { fontSize: "1.6rem" } }}
            InputLabelProps={{ style: { fontSize: "1.4rem" } }}
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Card number"
            fullWidth
            required
            inputProps={{ style: { fontSize: "1.6rem" } }}
            InputLabelProps={{ style: { fontSize: "1.4rem" } }}
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="Expiry date"
            fullWidth
            required
            inputProps={{ style: { fontSize: "1.6rem" } }}
            InputLabelProps={{ style: { fontSize: "1.4rem" } }}
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="standard"
            label="CVV"
            fullWidth
            required
            helperText="Last three digits on signature strip"
            inputProps={{ style: { fontSize: "1.6rem" } }}
            InputLabelProps={{ style: { fontSize: "1.4rem" } }}
            FormHelperTextProps={{ style: { fontSize: "1.2rem", fontStyle: "italic" } }}
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox size="large" />}
            label="Remember credit card details for next time"
            componentsProps={{ typography: { fontSize: "1.6rem" } }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CardInfo;
