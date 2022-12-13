import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import queryString from "query-string";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import styles from "./ManagerBooking.module.scss";
import classNames from "classnames/bind";

import Layout from "../../components/Layout";
import { StyledTableCell, StyledTableRow } from "../../../../components/Themes";
import request from "../../../../Utils/request";

const cx = classNames.bind(styles);

const ManagerBooking = () => {
  // ---------state----------
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);

  // ----------------router-dom----------
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // ----------call api to get all bookings ---------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("admin/booking/show");
        if (res.status === 200) {
          setBookings(res.data.bookings);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // --------handle calculate number of bookings to display --------
  const currentBookings = bookings.slice(8 * (page - 1), 8 * page);

  // --------handle when user click navigation btn-------------
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
    setSearchParams({ _page: newPage + 1 });
  };

  return (
    <Layout>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Number</StyledTableCell>
                  <StyledTableCell align="center">Tour</StyledTableCell>
                  <StyledTableCell align="center">Start-date</StyledTableCell>
                  <StyledTableCell align="center">end-date</StyledTableCell>
                  <StyledTableCell align="center">Booking-date</StyledTableCell>
                  <StyledTableCell align="center">Status-tour</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentBookings.length > 0 ? (
                  currentBookings.map((booking, index) => {
                    return (
                      <StyledTableRow key={booking._id}>
                        <StyledTableCell align="center">{index + 1}</StyledTableCell>
                        <StyledTableCell align="center">{booking.tour[0].title}</StyledTableCell>
                        <StyledTableCell align="center">{booking.timeStart}</StyledTableCell>
                        <StyledTableCell align="center">{booking.timeOut}</StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(booking.createdAt).format("MM-DD-YYYY")}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{ color: booking.auth == 0 ? "red" : "blue" }}
                        >
                          {booking.auth == 0 ? "not started yet" : "done"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              navigate({
                                pathname: "/admin/booking-detail",
                                search: queryString.stringify({ _id: booking._id }),
                              })
                            }
                          >
                            Detail
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                ) : (
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan="6"
                      sx={{ textAlign: "center", color: "red", fontStyle: "italic" }}
                    >
                      you have not booked any tour on the system!
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={bookings.length}
              rowsPerPage={5}
              page={page - 1}
              onPageChange={handleChangePage}
              sx={{
                ".MuiTablePagination-toolbar": {
                  pr: 4,
                },
                ".MuiTablePagination-displayedRows": {
                  color: "rgb(41, 39, 39)",
                  fontSize: "1.6rem",
                },
                ".MuiSvgIcon-root": {
                  fontSize: "2rem",
                },
              }}
            />
          </TableContainer>
        </div>
      </div>
    </Layout>
  );
};

export default ManagerBooking;
