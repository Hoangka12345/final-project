import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { useSnackbar } from "notistack";

import { Grid, Button, TextField, Paper } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import styles from "./RegisterPage.module.scss";
import classNames from "classnames/bind";

import LocationField from "./LocationField";
import Input from "../../../../components/Input";
import request from "../../../../Utils/request";

const cx = classNames.bind(styles);

function RegisterPage(props) {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [userName, setUserName] = useState({ value: "", error: false });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: false });
  const [email, setEmail] = useState({ value: "", error: false });
  const [password, setPassword] = useState({ value: "", error: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: false });
  const [address, setAddress] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const emailValidate = useRef(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  useEffect(() => {
    const checkFile = () => {
      if (!selectedFile) {
        setPreview(null);
        return;
      } else {
        const objUrl = URL.createObjectURL(selectedFile);
        setPreview(objUrl);
        return () => URL.revokeObjectURL(objUrl);
      }
    };

    checkFile();
  }, [selectedFile]);

  const handleBlur = (data, setData) => {
    if (data.value === "") {
      setData((prev) => ({ ...prev, error: true }));
    }
  };

  const handleBlurPhoneNumber = () => {
    if (phoneNumber.value.includes("_")) {
      setPhoneNumber((prev) => ({ ...prev, error: true }));
    } else {
      setPhoneNumber((prev) => ({ ...prev, error: false }));
    }
  };

  const handleChangeEmail = (e) => {
    setEmail((prev) => ({ ...prev, value: e.target.value }));
    if (emailValidate.current.test(e.target.value)) {
      setEmail({ value: e.target.value, error: false });
    }
  };

  const handleBlurEmail = (e) => {
    if (!emailValidate.current.test(email.value)) {
      setEmail((prev) => ({ ...prev, error: true }));
    } else {
      setEmail((prev) => ({ ...prev, error: false }));
    }
  };

  const handelClickRegister = async () => {
    const formData = new FormData();
    formData.append("username", userName.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("phoneNumber", phoneNumber.value.split(" ").join(""));
    formData.append("avt", selectedFile);
    formData.append("address", JSON.stringify(address));

    if (confirmPassword.value != password.value) {
      setConfirmPassword((prev) => ({ ...prev, error: true }));
      enqueueSnackbar("Please check the information again!", { variant: "error" });
      return;
    } else if (userName.error || phoneNumber.error || email.error || password.error) {
      enqueueSnackbar("Please check the information again!", { variant: "error" });
      return;
    } else {
      try {
        const res = await request.post("/company/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 200) {
          enqueueSnackbar("Register successfully, please wait for admin to confirm!", {
            variant: "success",
          });
          navigate("/company/login");
        }
      } catch (error) {
        enqueueSnackbar(error.response.data.Message, { variant: "error" });
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <VpnKeyIcon sx={{ fontSize: "6rem", color: "#0db8de" }} />
          <p>Company - Register</p>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={cx("thumbnail")}>
              <img src={preview ? preview : "https://wallpaperaccess.com/full/502196.jpg"} alt="" />
            </Paper>
            <label className={cx("choose-file")}>
              <AddPhotoAlternateIcon sx={{ fontSize: "4rem", color: "#6ea3ff", mt: 2 }} />
              <p>Choose a photo as a avatar of company</p>
              <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
            </label>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Input
                  value={userName.value}
                  error={userName.error}
                  label="username"
                  variant="standard"
                  focused
                  required
                  helperText={userName.error ? "user-name cannot be left blank!" : ""}
                  onChange={(e) => setUserName({ error: false, value: e.target.value })}
                  onBlur={() => handleBlur(userName, setUserName)}
                />
              </Grid>

              <Grid item xs={6}>
                <NumberFormat
                  format="#### ### ###"
                  mask="_"
                  customInput={Input}
                  value={phoneNumber.value}
                  error={phoneNumber.error}
                  label="phone number"
                  variant="standard"
                  focused
                  required
                  helperText={phoneNumber.error ? "Phone number is invalid!" : ""}
                  onChange={(e) => setPhoneNumber({ error: false, value: e.target.value })}
                  onBlur={() => {
                    handleBlur(phoneNumber, setPhoneNumber);
                    handleBlurPhoneNumber();
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  value={email.value}
                  error={email.error}
                  label="email"
                  variant="standard"
                  focused
                  required
                  helperText={email.error ? "email is invalid!" : ""}
                  onChange={handleChangeEmail}
                  onBlur={handleBlurEmail}
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  value={password.value}
                  type="password"
                  error={password.error}
                  label="password"
                  variant="standard"
                  focused
                  required
                  helperText={password.error ? "password cannot be left blank!" : ""}
                  onChange={(e) => setPassword({ error: false, value: e.target.value })}
                  onBlur={() => handleBlur(password, setPassword)}
                />
              </Grid>

              <Grid item xs={6}>
                <Input
                  value={confirmPassword.value}
                  type="password"
                  error={confirmPassword.error}
                  label="confirm password"
                  variant="standard"
                  focused
                  required
                  helperText={confirmPassword.error ? "password is not match!" : ""}
                  onChange={(e) => setConfirmPassword({ error: false, value: e.target.value })}
                />
              </Grid>

              <LocationField address={address} setAddress={setAddress} />

              <Grid item xs={12}>
                <div className={cx("login-btn")}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#0db8de",
                      width: "10rem",
                      height: "4rem",
                      borderColor: "#0db8de",
                      "&:hover": { backgroundColor: "#0db8de", color: "#fff" },
                    }}
                    onClick={handelClickRegister}
                  >
                    Register
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12}>
                <p className={cx("link")} onClick={() => navigate("/company/login")}>
                  Do you already have an account? Sign in here
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default RegisterPage;
