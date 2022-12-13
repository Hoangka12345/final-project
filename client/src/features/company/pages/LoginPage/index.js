import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

import { Button } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import styles from "./LoginPage.module.scss";
import classNames from "classnames/bind";

import Input from "../../../../components/Input";
import request from "../../../../Utils/request";

const cx = classNames.bind(styles);

function LoginPage(props) {
  const [email, setEmail] = useState({
    value: "",
    error: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
  });

  const emailValidate = useRef(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [cookie, setCookie, removeCookie] = useCookies();

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

  const handleBlurPassword = (e) => {
    if (password.value === "") {
      setPassword((prev) => ({ ...prev, error: true }));
    } else {
      setPassword((prev) => ({ ...prev, error: false }));
    }
  };

  const handelClickLogin = async () => {
    removeCookie("token");
    removeCookie("role");

    const data = { email: email.value, password: password.value };

    try {
      const res = await request.post("/company/login", data);
      console.log(res);
      if (res.status === 200) {
        const expires = new Date();
        expires.setTime(expires.getTime() + 31536000000); //1 year
        setCookie("token", res.data.token, {
          path: "/",
          expires,
        });
        setCookie("role", 2, {
          path: "/",
          expires,
        });

        navigate("/company");
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.Message, { variant: "error" });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <VpnKeyIcon sx={{ fontSize: "6rem", color: "#0db8de" }} />
          <p>Company - Sign in</p>
        </div>
        <Input
          error={email.error}
          value={email.value}
          label="Email"
          variant="standard"
          color="info"
          focused
          required
          helperText={email.error ? "your email is invalid!" : ""}
          sx={{ mt: 5 }}
          onChange={handleChangeEmail}
          onBlur={handleBlurEmail}
        />
        <Input
          error={password.error}
          value={password.value}
          type="password"
          label="Password"
          variant="standard"
          color="info"
          focused
          required
          helperText={password.error ? "Password cannot be left blank!" : ""}
          sx={{ mt: 6 }}
          onChange={(e) => setPassword({ error: false, value: e.target.value })}
          onBlur={handleBlurPassword}
        />
        <div className={cx("login-btn")}>
          <Button
            onClick={handelClickLogin}
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
          >
            Login
          </Button>
        </div>
        <p className={cx("link")} onClick={() => navigate("/company/register")}>
          Do not have an account? Register here
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
