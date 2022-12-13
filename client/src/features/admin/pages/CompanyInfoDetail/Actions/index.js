import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useSnackbar } from "notistack";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import styles from "./Actions.module.scss";
import classNames from "classnames/bind";

import request from "../../../../../Utils/request";
import ConfirmDelete from "../../../components/ConfirmDelete";
import ConfirmUpdate from "../../../../../components/ConfirmUpdate";

const cx = classNames.bind(styles);

const Actions = ({ isVerified }) => {
  // --------state----------
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogVerify, setOpenDialogVerify] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    pw: false,
    confirmpw: false,
  });

  // --------snackbar-----------
  const { enqueueSnackbar } = useSnackbar();

  // --------router-dom----------
  const location = useLocation();
  const navigate = useNavigate();

  // --------ref----------
  const companyId = useRef(queryString.parse(location.search)._id);

  const handleClose = () => {
    setOpenDialogUpdate(false);
    setOpenDialogVerify(false);
    setOpenDeleteConfirm(false);
  };

  // --------------call api to verify company acc------
  const handleVerifyCompanyAccount = async () => {
    try {
      const res = await request.put("/admin/user/auth", {
        userId: companyId.current,
      });
      if (res.status === 200) {
        enqueueSnackbar("verify company account successfully!", {
          variant: "success",
        });
        navigate(-1);
      }
    } catch (error) {}
  };

  const handleUpdateCompanyInfo = async () => {
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
          `/admin/user/update-user/${companyId.current}`,
          data
        );
        if (res.status === 200) {
          handleClose();
          setPassword("");
          setConfirmPassword("");
          enqueueSnackbar("Change company's info successfully!", {
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

  // --------handle delete company's account --------------------
  const handleDeleteCompany = async () => {
    try {
      const res = await request.delete(
        `admin/user/delete-user/${companyId.current}`
      );
      if (res.status === 200) {
        enqueueSnackbar("Delete company's account successfully!", {
          variant: "success",
        });
        navigate("/admin/company");
      }
    } catch (error) {}
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ fontSize: "1.8rem", fontWeight: "bold", mr: 8 }}
        color="warning"
        onClick={() => setOpenDialogUpdate(true)}
      >
        Edit info
      </Button>
      <Button
        variant="outlined"
        sx={{ fontSize: "1.8rem", fontWeight: "bold", mr: 8 }}
        color="error"
        onClick={() => setOpenDeleteConfirm(true)}
      >
        Delete company
      </Button>

      {isVerified && (
        <Button
          variant="outlined"
          sx={{ fontSize: "1.8rem", fontWeight: "bold" }}
          color="info"
          onClick={() => setOpenDialogVerify(true)}
        >
          Verify company
        </Button>
      )}

      <ConfirmUpdate
        open={openDialogUpdate}
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
        handleUpdate={handleUpdateCompanyInfo}
        title="Edit company's info..."
      />

      <Dialog
        open={openDialogVerify}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
        >
          {"Confirm to verify account for company..."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "2.2rem" }}
          >
            Are you sure to let this company work on Vietnam travel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ fontSize: "1.2rem", mr: 2 }}
            variant="outlined"
            color="warning"
          >
            Disagree
          </Button>
          <Button
            onClick={() => handleVerifyCompanyAccount()}
            sx={{ fontSize: "1.2rem", mr: 2 }}
            variant="outlined"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDelete
        open={openDeleteConfirm}
        handleClose={handleClose}
        handleDelete={handleDeleteCompany}
        title="Confirm delete company's account"
        content="If you delete this account, it will dissapear forever in system... Are you sure to
        delete this account?"
      />
    </>
  );
};

export default Actions;
