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

  const { services, setServices, setServiceList } = useContext(TourContext);

  const fieldLenght = useRef(1);
  const contents = useRef([]);

  const { enqueueSnackbar } = useSnackbar();

  // ------handle when use choose item in service checkbox----------
  const handleChangeChecked = (e, service) => {
    if (e.target.checked) {
      setServices((prev) => [...prev, service]);
    } else if (!e.target.checked) {
      const newList = [...services];
      setServices(() => newList.filter((data) => data !== service));
    }
  };

  const handleChangeService = (e, index) => {
    contents.current[index] = e.target.value;
    setServiceList([...contents.current]);
  };

  const handleAddField = () => {
    setCount((prev) => prev + 1);
    fieldLenght.current = count + 1;
  };

  const handleHideField = () => {
    setCount((prev) => prev - 1);
    fieldLenght.current = count - 1;
    if (fieldLenght.current <= 0) {
      fieldLenght.current = 1;
      enqueueSnackbar("you need to enter at least one service!", { variant: "error" });
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
        {[...new Array(fieldLenght.current)].map((i, index) => {
          return (
            <Grid item xs={12} key={index}>
              <div className={cx("actions")}>
                <p>Service {index + 1}</p>
                <TextField
                  fullWidth
                  className={cx("text-field")}
                  sx={{ mt: 1 }}
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
