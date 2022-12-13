import React, { useContext, useEffect, useState } from "react";

import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

import styles from "./Address.module.scss";
import classNames from "classnames/bind";

import { northern, central, southern } from "../../../../../../components/Data";
import { TourContext } from "../../index";

const cx = classNames.bind(styles);

function Address(props) {
  const [cities, setCities] = useState([]);
  const [boolean, setBoolean] = useState(false);

  const { region, setRegion, city, setCity } = useContext(TourContext);

  useEffect(() => {
    const getCities = () => {
      if (region === "Northern Vietnam") {
        setCities(northern);
        setBoolean(true);
      } else if (region === "Central Vietnam") {
        setCities(central);
        setBoolean(true);
      } else if (region === "Southern Vietnam") {
        setCities(southern);
        setBoolean(true);
      }
    };

    getCities();
  }, [region]);

  return (
    <>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.4rem" }}>
            Region
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Region"
            sx={{ fontSize: "1.6rem" }}
            onChange={(e) => setRegion(e.target.value)}
          >
            <MenuItem value={"Northern Vietnam"}>Northern Vietnam</MenuItem>
            <MenuItem value={"Central Vietnam"}>Central Vietnam</MenuItem>
            <MenuItem value={"Southern Vietnam"}>Southern Vietnam</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.4rem" }}>
            City
          </InputLabel>
          <Select
            disabled={!boolean}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="City"
            sx={{ fontSize: "1.6rem" }}
            onChange={(e) => setCity(e.target.value)}
          >
            {cities.map((data, index) => {
              return (
                <MenuItem value={data} key={data}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}

export default Address;
