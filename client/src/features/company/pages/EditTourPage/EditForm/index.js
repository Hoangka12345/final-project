import React, { useContext, useState } from "react";
import { useSnackbar } from "notistack";

import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";

import styles from "./CreateForm.module.scss";
import classNames from "classnames/bind";

import Introduction from "./Introduction";
import Address from "./Address";
import Service from "./Service";
import Price from "./Price";
import Program from "./Program";
import { TourContext } from "../index";

const cx = classNames.bind(styles);

function CreateForm(props) {
  const { handleEditTour } = props;

  const {
    title,
    setTitle,
    departureTime,
    setDepartureTime,
    transport,
    setTransport,
    category,
    setCategory,
    totalTour,
    setTotalTour,
  } = useContext(TourContext);

  const { enqueueSnackbar } = useSnackbar();

  const handleChangeTotalTour = (e) => {
    if (isNaN(e.target.value)) {
      setTotalTour("1");
      enqueueSnackbar("Total tour must be a number", { variant: "error" });
    } else {
      setTotalTour(e.target.value);
    }
  };

  const handleClickUpdate = () => {
    handleEditTour();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Title"
          value={title}
          variant="outlined"
          fullWidth
          className={cx("text-field")}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>

      <Address />

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.4rem" }}>
            Departure time
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={departureTime}
            label="Departure time"
            sx={{ fontSize: "1.6rem" }}
            onChange={(e) => setDepartureTime(e.target.value)}
          >
            <MenuItem value={"Monday"}>Monday</MenuItem>
            <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
            <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
            <MenuItem value={"Thursday"}>Thursday</MenuItem>
            <MenuItem value={"Friday"}>Friday</MenuItem>
            <MenuItem value={"Seturday"}>Seturday</MenuItem>
            <MenuItem value={"Sunday"}>Sunday</MenuItem>
            <MenuItem value={"Days of week"}>Days of week</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Introduction />

      <Service />

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.4rem" }}>
            Transportation
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={transport}
            label="Departure time"
            sx={{ fontSize: "1.6rem" }}
            onChange={(e) => setTransport(e.target.value)}
          >
            <MenuItem value={"Cars"}>Cars</MenuItem>
            <MenuItem value={"Plane"}>Plane</MenuItem>
            <MenuItem value={"Both cars and plane"}>Both cars and plane</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Program />

      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.4rem" }}>
            Type of tour
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Departure time"
            sx={{ fontSize: "1.6rem" }}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"Explore - experience"}>Explore - experience</MenuItem>
            <MenuItem value={"Resort"}>Resort</MenuItem>
            <MenuItem value={"Team Building"}>Team Building</MenuItem>
            <MenuItem value={"Culinary culture"}>Culinary culture</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Total tours"
          value={totalTour}
          variant="outlined"
          fullWidth
          className={cx("text-field")}
          onChange={handleChangeTotalTour}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          disabled
          label="Avainable tours"
          value={totalTour ? totalTour : 1}
          variant="outlined"
          fullWidth
          className={cx("text-field")}
        />
      </Grid>

      <Price />

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
          onClick={handleClickUpdate}
          color="secondary"
        >
          Update tour info
        </Button>
      </Grid>
    </Grid>
  );
}

export default CreateForm;
