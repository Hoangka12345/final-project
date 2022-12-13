import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ConfirmUpdate = (props) => {
  const {
    open,
    handleClose,
    password,
    setPassword,
    showPassword,
    handleClickToggleShowPassword,
    handleMouseDownPassword,
    confirmPassword,
    setConfirmPassword,
    handleClickToggleShowConfirmPassword,
    handleUpdate,
    title,
  } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ mt: 2, fontSize: "1.4rem", pr: 1, backgroundColor: "#fff" }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword.pw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickToggleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword.pw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{ mt: 2 }}
              inputProps={{ style: { fontSize: "1.6rem" } }}
              label="Password"
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ mt: 2, fontSize: "1.4rem", pr: 1, backgroundColor: "#fff" }}
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword.confirmpw ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickToggleShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword.confirmpw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{ mt: 2 }}
              inputProps={{ style: { fontSize: "1.6rem" } }}
              label="Password"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleUpdate()}
            sx={{ fontSize: "1.2rem", mr: 2 }}
            variant="contained"
            color="secondary"
          >
            Update
          </Button>
          <Button onClick={handleClose} sx={{ fontSize: "1.2rem", mr: 2 }} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmUpdate;
