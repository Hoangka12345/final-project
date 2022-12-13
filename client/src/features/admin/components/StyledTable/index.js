import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

import styles from "./StyledTable.module.scss";
import classNames from "classnames/bind";

import { StyledTableCell, StyledTableRow } from "../../../../components/Themes";
import { URL_AVT } from "../../../../components/Constants";

const cx = classNames.bind(styles);

const StyledTable = (props) => {
  // --------props----------
  const { currentUsers, usersSearch, isLoad, setIsLoad } = props;

  // --------state----------
  const [page, setPage] = useState(0);

  // ----------------router-dom----------
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // --------handle when user click navigation btn-------------
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setIsLoad(!isLoad);
    setSearchParams({ _page: newPage + 1 });
  };

  // --------handle when user view detail-------------
  const handleNavigateToDetailPage = (id, role) => {
    if (role == 1) {
      navigate({
        pathname: "/admin/user-detail",
        search: queryString.stringify({ _id: id }),
      });
    } else if (role == 2) {
      navigate({
        pathname: "/admin/company-detail",
        search: queryString.stringify({ _id: id }),
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Avatar</StyledTableCell>
            <StyledTableCell align="center">User name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone number</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUsers.current.length > 0 &&
            currentUsers.current.map((user, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    <div className={cx("avatar")}>
                      <img src={user.avatar && `${URL_AVT}/${user.avatar}`} alt="" />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.username && user.username}</StyledTableCell>
                  <StyledTableCell align="center">{user.email && user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.phoneNumber && user.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      sx={{ mr: 2, fontSize: "1.1rem", fontWeight: "bold" }}
                      color="secondary"
                      onClick={() => handleNavigateToDetailPage(user._id, user.role)}
                    >
                      Detail
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={usersSearch.length}
        rowsPerPage={5}
        page={page}
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

export default StyledTable;
