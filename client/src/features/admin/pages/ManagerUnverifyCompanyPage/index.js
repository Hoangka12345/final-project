import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination } from "@mui/material";

import styles from "./ManagerUnverifyCompanyPage.module.scss";
import classNames from "classnames/bind";

import Layout from "../../components/Layout";
import request from "../../../../Utils/request";
import { URL_AVT } from "../../../../components/Constants";
import { StyledTableCell, StyledTableRow } from "../../../../components/Themes";

const cx = classNames.bind(styles);

function ManagerUnverifyCompanyPage(props) {
  const [companies, setCompanies] = useState([]);
  const [companiesSearch, setCompaniesSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoad, setIsLoad] = useState(false);

  // --------router-dom----------
  const location = useLocation();
  const navigate = useNavigate();

  // --------useRef----------
  const currentCompanies = useRef([]);

  // --------call api to get all users---------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("admin/user/companyunauth");
        if (res.status === 200) {
          setCompanies(res.data.companies);
          setCompaniesSearch(res.data.companies);
          setIsLoad(!isLoad);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // --------useMemo----------
  const first = page * rowsPerPage;
  const last = (page + 1) * rowsPerPage;
  currentCompanies.current = companiesSearch.slice(first, last);

  const params = useMemo(() => {
    return queryString.parse(location.search).key || "";
  }, [location.search]);

  // --------handle search----------------
  useEffect(() => {
    const newCompanies = companies.filter((company) => {
      const search = params.toLowerCase();
      return company.username.toLowerCase().match(new RegExp(search, "g"));
    });
    setCompaniesSearch(newCompanies);
    setIsLoad(!isLoad);
  }, [params]);

  // --------handle when user click navigation btn-------------
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setIsLoad(!isLoad);
  };

  return (
    <Layout>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
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
                {currentCompanies.current.length > 0 ? (
                  currentCompanies.current.map((company, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          <div className={cx("avatar")}>
                            <img src={company.avatar && `${URL_AVT}/${company.avatar}`} alt="" />
                          </div>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {company.username && company.username}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {company.email && company.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {company.phoneNumber && company.phoneNumber}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Button
                            variant="outlined"
                            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                            color="secondary"
                            onClick={() =>
                              navigate({
                                pathname: "/admin/company-detail",
                                search: queryString.stringify({ _id: company._id }),
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
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        color: "red",
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                    >
                      All of companies are moderated!
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={companiesSearch.length}
              rowsPerPage={rowsPerPage}
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
        </div>
      </div>
    </Layout>
  );
}

export default ManagerUnverifyCompanyPage;
