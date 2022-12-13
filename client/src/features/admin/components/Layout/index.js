import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Grid, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./Layout.module.scss";
import classNames from "classnames/bind";

import MenuList from "./MenuList";

const cx = classNames.bind(styles);

function Layout({ children }) {
  // --------state----------
  const [disabled, setDisabled] = useState(false);

  // --------router-dom----------
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // --------react-cookies----------
  const [cookie, setCookies, removeCookie] = useCookies();

  // --------userEffect----------
  useEffect(() => {
    if (
      location.pathname == "/admin/user" ||
      location.pathname == "/admin/company" ||
      location.pathname == "/admin/verify-company" ||
      location.pathname == "/admin/unverify-company"
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [location.pathname]);

  // --------handle when user click homepage-------------
  const handleNavigateHomePage = () => {
    navigate("/admin");
  };

  const handleChangeSearchValue = (e) => {
    if (e.target.value == "") {
      searchParams.delete("_key");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ _key: e.target.value });
    }
  };

  // --------handle log out --------
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("role");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("tab-bar")}>
        <MenuList />
      </div>

      <div className={cx("container")}>
        <Grid container>
          <Grid item xs={12}>
            <div className={cx("header")}>
              <div className={cx("admin-title")} onClick={handleNavigateHomePage}>
                Admin Page
              </div>

              <div className={cx("search-box")}>
                <button disabled={disabled} className={disabled ? cx("disabled-button") : cx("")}>
                  <SearchIcon sx={{ fontSize: "3rem" }} />
                </button>
                <input
                  type="text"
                  className={cx("input-search")}
                  placeholder="Search..."
                  onChange={handleChangeSearchValue}
                ></input>
              </div>

              <div className={cx("intro")}>
                <div className={cx("username")}>Wellcome Admin</div>
                <IconButton
                  color="inherit"
                  size="small"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    fontSize: "2.2rem",
                    fontWeight: "bold",
                    gap: 0.5,
                  }}
                  onClick={() => handleLogout()}
                >
                  <LogoutIcon sx={{ fontSize: "2.5rem" }} />
                  Logout
                </IconButton>
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div>{children}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Layout;
