import React, { useContext, useRef, useState } from "react";
import { useSnackbar } from "notistack";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import styles from "./Service.module.scss";
import classNames from "classnames/bind";

import { TourContext } from "../../index";

const cx = classNames.bind(styles);

const data = [
  "Insurance",
  "Meal",
  "Tour guide",
  "Sightseeing tickets",
  "CarS (as required)",
  "Hotel/Motel room",
];

function Service(props) {
  const [count, setCount] = useState(1);

  const { services, setServices, serviceList, setServiceList } = useContext(TourContext);

  const fieldLenght = useRef(1);
  const contents = useRef([]);

  const { enqueueSnackbar } = useSnackbar();

  // ------handle when use choose item in service checkbox----------
  const handleChangeChecked = (e, service) => {
    if (e.target.checked) {
      setServices((prev) => [...prev, service]);
    } else if (!e.target.checked) {
      const newList = [...services].filter((data) => data !== service);
      setServices(newList);
    }
  };

  const handleChangeService = (e, index) => {
    serviceList.map((service, indexMap) => {
      contents.current[indexMap] = service;
    });
    contents.current[index] = e.target.value;
    setServiceList([...contents.current]);
  };

  const handleAddField = () => {
    setServiceList((prev) => [...prev, ""]);
  };

  const handleHideField = (indexDecrease) => {
    if (serviceList.length > 1) {
      const newServiceList = [...serviceList].filter((data, index) => index !== indexDecrease);
      setServiceList(newServiceList);
    } else {
      enqueueSnackbar("the list of content must have   at least 1!", { variant: "error" });
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Accordion className={cx("service")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <p>Accompanying services</p>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <div className={cx("service-checkbox")}>
              {data.map((service) => {
                return (
                  <div className={cx("service-item")} key={service}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={service}
                          checked={services.includes(service)}
                          size="large"
                          onChange={(e) => handleChangeChecked(e, service)}
                        />
                      }
                      sx={{ m: 0 }}
                    />
                    <span>{service}</span>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        {serviceList.map((data, index) => {
          return (
            <Grid item xs={12} key={index} sx={{ mt: 2 }}>
              <div className={cx("actions")}>
                <p>content {index + 1}</p>
                <TextField
                  value={data}
                  fullWidth
                  multiline
                  rows={2}
                  inputProps={{ style: { fontSize: "1.6rem", lineHeight: "2rem" } }}
                  onChange={(e) => handleChangeService(e, index)}
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
    </>
  );
}

export default Service;
