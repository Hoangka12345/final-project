import React, { useState } from "react";

import { Button, Grid } from "@mui/material";

import styles from "./Planning.module.scss";
import classNames from "classnames/bind";

import Program from "./Program";
import Service from "./Service";
import Regulation from "./Regulation";

const cx = classNames.bind(styles);

function Planning(props) {
  // -----------props----------
  const { tour } = props;

  // ----------state----------
  const [plan, setPlan] = useState("program");

  return (
    <div className={cx("wrapper")}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button
            variant={plan === "program" ? "contained" : "text"}
            fullWidth
            onClick={() => setPlan("program")}
            sx={{ fontSize: "1.4rem" }}
          >
            Program
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant={plan === "service" ? "contained" : "text"}
            fullWidth
            onClick={() => setPlan("service")}
            sx={{ fontSize: "1.4rem" }}
          >
            Service
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant={plan === "regulations" ? "contained" : "text"}
            fullWidth
            onClick={() => setPlan("regulations")}
            sx={{ fontSize: "1.4rem" }}
          >
            Regulations
          </Button>
        </Grid>
      </Grid>
      <div className={cx("content")}>
        {plan === "program" ? (
          <Program tour={tour} />
        ) : plan === "service" ? (
          <Service tour={tour} />
        ) : (
          <Regulation />
        )}
      </div>
    </div>
  );
}

export default Planning;
