import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";

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

import {
  StyledTableCell,
  StyledTableRow,
} from "../../../../../components/Themes";

const HistoryTable = (props) => {
  // --------props----------
  const { bookings } = props;

  // --------state----------
  const [page, setPage] = useState(1);

  // --------memo----------
  const currentBookings = useMemo(() => {
    if (bookings.length > 0) {
      return bookings.slice(10 * (page - 1), 10 * page);
    } else {
      return [];
    }
  }, [page]);

  // ----------------router-dom----------
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // --------handle when user click navigation btn-------------
  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
    setSearchParams({ _page: newPage + 1 });
  };

  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {currentBookings.length > 0 ? (
            currentBookings.map((booking, index) => {
              return (
                <StyledTableRow key={booking._id}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {booking.tour[0].title}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {booking.timeStart}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {booking.timeOut}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(booking.createdAt).format("DD-MM-YYYY")}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ color: booking.auth == 0 ? "red" : "blue" }}
                  >
                    {booking.auth == 0 ? "not started yet" : "done"}
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
        rowsPerPageOptions={[10]}
        component="div"
        count={bookings.length}
        rowsPerPage={10}
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
  );
};

export default HistoryTable;
