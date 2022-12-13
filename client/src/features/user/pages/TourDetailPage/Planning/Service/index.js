import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import styles from "./Service.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const className = {
  head_cell: { fontSize: "1.8rem", fontWeight: "bold", color: "#fff" },
};

function index(props) {
  // ----------props--------------------
  const { tour } = props;
  const services = tour.service ? tour.service : [];

  return (
    <div className={cx("wrapper")}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className={cx("table-head")}>
            <TableRow>
              <TableCell align="center" sx={className.head_cell}>
                Departure time
              </TableCell>
              <TableCell align="center" sx={className.head_cell}>
                Transportation
              </TableCell>
              <TableCell align="center" sx={className.head_cell}>
                Price of Tour(VND/ person)**
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                {tour.dateStart && tour.dateStart}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: "1.6rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                Cars from 6 to 16 seats
                <DirectionsBusIcon sx={{ fontSize: "2rem" }} />
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                  tour.price && tour.price
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className={cx("service")}>
        <p>Accompanying services:</p>
        <ul>
          {services.map((service) => {
            return <li key={service}>{service}</li>;
          })}
        </ul>
      </div>

      <div className={cx("note")}>
        <div className={cx("note-content")}>
          **Child price applies only when the number of children does not account for 10% of the
          total number of guests.**
        </div>
        <div className={cx("note-content")}>
          ***Prices may vary depending on the time of tour departure and on-demand services. Contact
          to Call center <span>1900 3398</span> for a detailed quote.
        </div>
      </div>
    </div>
  );
}

export default index;
