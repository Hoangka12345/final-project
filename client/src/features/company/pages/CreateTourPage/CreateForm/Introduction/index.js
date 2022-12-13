import React, { useContext, useRef, useState } from "react";
import { useSnackbar } from "notistack";

import { Grid, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "./Introduction.module.scss";
import classNames from "classnames/bind";

import { TourContext } from "../../index";

const cx = classNames.bind(styles);

function Introduction(props) {
  const [count, setCount] = useState(1);

  const { introduction, setIntroduction, setIntroDetail } = useContext(TourContext);

  const { enqueueSnackbar } = useSnackbar();

  const fieldLenght = useRef(1);
  const contents = useRef([]);

  const handleChangeContent = (e, index) => {
    contents.current[index] = e.target.value;
    setIntroDetail([...contents.current]);
  };

  // ---------handle when user click add icon----------
  const handleAddField = () => {
    setCount((prev) => prev + 1);
    fieldLenght.current = count + 1;
    if (fieldLenght.current >= 7) {
      fieldLenght.current = 6;
      enqueueSnackbar("You can only add up to 6 contents!", { variant: "error" });
    }
  };

  // ---------handle when user click removo icon----------
  const handleHideField = () => {
    setCount((prev) => prev - 1);
    fieldLenght.current = count - 1;
    if (fieldLenght.current <= 0) {
      fieldLenght.current = 1;
      enqueueSnackbar("you need to enter at least one content!", { variant: "error" });
    }
  };

  return (
    <Grid item xs={12}>
      <TextField
        label="Introduction"
        value={introduction}
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        className={cx("text-field")}
        inputProps={{ style: { fontSize: "1.6rem" } }}
        onChange={(e) => setIntroduction(e.target.value)}
      />

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[...new Array(fieldLenght.current)].map((i, index) => {
          return (
            <Grid item xs={12} key={index}>
              <div className={cx("actions")}>
                <p>content {index + 1}</p>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  inputProps={{ style: { fontSize: "1.6rem" } }}
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
