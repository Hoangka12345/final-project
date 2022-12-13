import React, { useRef, useState } from "react";
import { useSnackbar } from "notistack";

import { Grid, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import styles from "./LocationField.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function LocationField(props) {
  const { setAddress } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [count, setCount] = useState(1);

  const locationsRef = useRef([]);
  const fieldLenght = useRef(count);

  const handleAddField = () => {
    setCount((prev) => prev + 1);
    fieldLenght.current = count + 1;
    if (fieldLenght.current >= 7) {
      fieldLenght.current = 6;
      enqueueSnackbar("You can only add up to 6 bases!", { variant: "error" });
    }
  };

  const handleOnChange = (e, index) => {
    locationsRef.current[index] = e.target.value;
    setAddress([...locationsRef.current]);
  };

  return [...new Array(fieldLenght.current)].map((i, index) => {
    return (
      <Grid item xs={6} key={index}>
        <div className={cx("container")}>
          <TextField
            name="location"
            label={`Location address ${index + 1}`}
            variant="standard"
            color="info"
            focused
            fullWidth
            className={cx("text-field")}
            // sx={{
            //   "& .MuiInput-underline:after": { borderBottomColor: "#0db8de" },
            // }}
            onChange={(e) => handleOnChange(e, index)}
          />
          <IconButton onClick={handleAddField}>
            <AddIcon
              sx={{ fontSize: "2.5rem", color: "#fff", fontWeight: "bold" }}
            />
          </IconButton>
          {/* <IconButton onClick={handleHideField}>
                    <CloseIcon sx={{ fontSize: "2.5rem", color: "#fff", fontWeight: "bold" }} />
                  </IconButton> */}
        </div>
      </Grid>
    );
  });
}

export default LocationField;
