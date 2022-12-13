import React, { useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { Button } from "@mui/material";

import styles from "./Actions.module.scss";
import classNames from "classnames/bind";

import request from "../../../../../Utils/request";
import ConfirmDelete from "../../../components/ConfirmDelete";
import ConfirmUpdate from "../../../../../components/ConfirmUpdate";

const cx = classNames.bind(styles);

const Actions = ({ user }) => {
  // --------state----------
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    pw: false,
    confirmpw: false,
  });

  // --------snackbar-----------
  const { enqueueSnackbar } = useSnackbar();

  // --------router-dom----------
  const navigate = useNavigate();
  const location = useLocation();

  // --------ref----------
  const params = useRef(queryString.parse(location.search)._id);

  const handleClose = () => {
    setOpenUpdate(false);
    setOpenConfirmDelete(false);
  };

  const handleUpdateUserInfo = async () => {
    if (
      confirmPassword !== password ||
      password == "" ||
      confirmPassword == ""
    ) {
      enqueueSnackbar("please check your form update again!", {
        variant: "error",
      });
    } else {
      try {
        const data = { password };
        const res = await request.put(
          `/admin/user/update-user/${params.current}`,
          data
        );
        if (res.status === 200) {
          handleClose();
          setPassword("");
          setConfirmPassword("");
          enqueueSnackbar("Change user's info successfully!", {
            variant: "success",
          });
        }
      } catch (error) {}
    }
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

  const handleDeleteUser = async () => {
    try {
      const res = await request.delete(
        `admin/user/delete-user/${params.current}`
      );
      if (res.status === 200) {
        enqueueSnackbar("Delete user's account successfully!", {
          variant: "success",
        });
        navigate("/admin/user");
      }
    } catch (error) {}
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ fontSize: "1.8rem", fontWeight: "bold", mr: 10 }}
        color="warning"
        onClick={() => setOpenUpdate(true)}
      >
        Edit info
      </Button>
      <Button
        variant="outlined"
        sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
        color="error"
        onClick={() => setOpenConfirmDelete(true)}
      >
        Delete user
      </Button>

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
        handleUpdate={handleUpdateUserInfo}
        title="Edit user's info..."
      />

      <ConfirmDelete
        open={openConfirmDelete}
        handleClose={handleClose}
        handleDelete={handleDeleteUser}
        title="Confirm delete user's account"
        content="If you delete this account, it will dissapear forever in system... Are you sure to
        delete this account?"
      />
    </>
  );
};

export default Actions;
