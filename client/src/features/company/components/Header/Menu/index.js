import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import { Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import styles from "./Menu.module.scss";
import classNames from "classnames/bind";

import ConfirmUpdate from "../../../../../components/ConfirmUpdate";
import request from "../../../../../Utils/request";

const cx = classNames.bind(styles);

function MenuList(props) {
  // ---------props------------
  const { setCompanyInfo } = props;

  // ----------state---------------
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    pw: false,
    confirmpw: false,
  });

  // ------------snackbar------------
  const { enqueueSnackbar } = useSnackbar();

  // ------------router-dom---------------
  const navigate = useNavigate();

  // ------------cookie------------------
  const [cookie, setCookie, removeCookie] = useCookies();

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenUpdate(false);
  };

  const handleClickToggleShowPassword = () => {
    setShowPassword((prev) => ({ ...prev, pw: !showPassword.pw }));
  };

  const handleClickToggleShowConfirmPassword = () => {
    setShowPassword((prev) => ({
      ...prev,
      confirmpw: !showPassword.confirmpw,
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("role", { path: "/" });
    setAnchorEl(null);
    setCompanyInfo({});
    navigate("/company/login");
  };

  const handleChangepassword = async () => {
    if (confirmPassword !== password) {
      enqueueSnackbar("comfirm password is incorrect!", { variant: "error" });
    } else {
      try {
        const res = await request.put("/company/update", { password });
        if (res.status === 200) {
          handleClose();
          setPassword("");
          setConfirmPassword("");
          enqueueSnackbar("Change password successfully!", {
            variant: "success",
          });
        }
      } catch (error) {}
    }
  };

  return (
    <div className={cx("wrapper")}>
      <ArrowDropDownIcon
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ fontSize: "3.5rem", color: "#555", cursor: "pointer" }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => setOpenUpdate(true)}
          sx={{ fontSize: "1.6rem" }}
        >
          Change Password
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ fontSize: "1.6rem" }}>
          Logout
        </MenuItem>
      </Menu>

      <ConfirmUpdate
        open={openUpdate}
        handleClose={handleClose}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        handleClickToggleShowPassword={handleClickToggleShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleClickToggleShowConfirmPassword={
          handleClickToggleShowConfirmPassword
        }
        handleUpdate={handleChangepassword}
        title="Change password..."
      />
    </div>
  );
}

export default MenuList;
