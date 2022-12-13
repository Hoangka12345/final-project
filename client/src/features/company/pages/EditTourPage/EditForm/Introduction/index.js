import React, { useContext, useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";

import { Grid, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "./Introduction.module.scss";
import classNames from "classnames/bind";

import { TourContext } from "../../index";

const cx = classNames.bind(styles);

function Introduction(props) {
  // -----------context------------
  const { introduction, introDetail, setIntroduction, setIntroDetail } = useContext(TourContext);

  // ---------snackbar-----------
  const { enqueueSnackbar } = useSnackbar();

  // -------------useRef----------------
  const Contents = useRef([]);

  // ------------handle change old input--------------
  const handleChangeContent = (e, index) => {
    introDetail.map((data, indexMap) => {
      Contents.current[indexMap] = data;
    });
    Contents.current[index] = e.target.value;
    setIntroDetail([...Contents.current]);
  };

  // ---------handle when user click add icon----------
  const handleAddField = () => {
    if (introDetail.length < 7) {
      setIntroDetail((prev) => [...prev, ""]);
    } else {
      enqueueSnackbar("the list of content cannot more than 7!", { variant: "error" });
    }
  };

  // ---------handle when user click removo icon----------
  const handleHideField = (indexDecrease) => {
    if (introDetail.length > 1) {
      const newIntroDetail = [...introDetail].filter((data, index) => index !== indexDecrease);
      setIntroDetail(newIntroDetail);
    } else {
      enqueueSnackbar("the list of content must have   at least 1!", { variant: "error" });
    }
  };

  return (
    <Grid item xs={12}>
      <TextField
        label="Introduction"
        value={introduction}
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        className={cx("text-field")}
        inputProps={{ style: { fontSize: "1.6rem", textAlign: "justify", lineHeight: "2rem" } }}
        onChange={(e) => setIntroduction(e.target.value)}
      />

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {introDetail.map((data, index) => {
          return (
            <Grid item xs={12} key={index}>
              <div className={cx("actions")}>
                <p>content {index + 1}</p>
                <TextField
                  value={data}
                  fullWidth
                  multiline
                  rows={2}
                  inputProps={{ style: { fontSize: "1.6rem", lineHeight: "2rem" } }}
                  onChange={(e) => handleChangeContent(e, index)}
                />
                <div className={cx("action-btn")}>
                  <IconButton onClick={handleAddField}>
                    <AddIcon sx={{ fontSize: "2.5rem", fontWeight: "bold" }} />
                  </IconButton>
                  <IconButton onClick={() => handleHideField(index)}>
                    <RemoveIcon sx={{ fontSize: "2.5rem", fontWeight: "bold" }} />
                  </IconButton>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Introduction;
