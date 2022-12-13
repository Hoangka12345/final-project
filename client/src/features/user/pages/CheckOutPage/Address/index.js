import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useSnackbar } from "notistack";
import moment from "moment";

import { Grid, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./Address.module.scss";
import classNames from "classnames/bind";

import { CheckOutContext } from "../../../../../Context/CheckOutContext";

const cx = classNames.bind(styles);

const dataField = [
  "Full name",
  "Email",
  "Phone number",
  "Address",
  "Number of tickets",
  "Price (person)",
];

function CheckOutPage(props) {
  // --------props----------
  const { tour } = props;

  // --------context-------
  const { name, setName, email, setEmail, phone, setPhone, address, setAddress } =
    useContext(CheckOutContext);

  // -----------snackbar----------------
  const { enqueueSnackbar } = useSnackbar();

  // -----------router-dom------------
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // ------------useRef--------------
  const params = useRef(queryString.parse(location.search));
  const [numberTicket, setNumberTicket] = useState(parseInt(params.current._ticket));

  const handleIncreaseTicket = () => {
    setNumberTicket((prev) => prev + 1);
  };
  const handleDecreaseTicket = () => {
    if (numberTicket - 1 > 1) {
      setNumberTicket((prev) => prev - 1);
    } else {
      if (numberTicket - 1 === 1) {
        setNumberTicket(1);
      } else if (numberTicket - 1 < 1) {
        enqueueSnackbar("The number of tickets is at least one", { variant: "error" });
      }
    }
  };

  useEffect(() => {
    setSearchParams({ ...params.current, _ticket: numberTicket });
  }, [numberTicket]);

  return (
    <Grid container sx={{ mt: 2, mb: 2 }}>
      <Grid item xs={4}>
        {dataField.map((data) => (
          <div className={cx("data-field")} key={data}>
            {data}:
          </div>
        ))}
      </Grid>
      <Grid item xs={8}>
        <TextField
          variant="outlined"
          fullWidth
          value={name}
          className={cx("text-field")}
          sx={{ mt: 2 }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          value={email}
          className={cx("text-field")}
          sx={{ mt: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          value={phone}
          className={cx("text-field")}
          sx={{ mt: 2 }}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          value={address}
          className={cx("text-field")}
          sx={{ mt: 2 }}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className={cx("ticket")}>
          <TextField
            disabled
            variant="outlined"
            fullWidth
            value={numberTicket}
            onChange={(e) => setNumberTicket(e.target.value)}
            className={cx("text-field")}
            sx={{ mt: 2 }}
          />
          <div className={cx("ticket-icon")}>
            <FontAwesomeIcon
              icon={faCaretUp}
              className={cx("icon")}
              onClick={handleIncreaseTicket}
            />
            <FontAwesomeIcon
              icon={faCaretDown}
              className={cx("icon")}
              onClick={handleDecreaseTicket}
            />
          </div>
        </div>
        <TextField
          disabled
          variant="outlined"
          fullWidth
          value={new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
            tour.price && tour.price
          )}
          className={cx("text-field")}
          sx={{ mt: 2 }}
        />
      </Grid>
    </Grid>
  );
}

export default CheckOutPage;
