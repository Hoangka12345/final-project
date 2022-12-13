import React, { useContext, useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";

import { Grid, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./Program.module.scss";
import classNames from "classnames/bind";

import { TourContext } from "../../index";

const cx = classNames.bind(styles);

function Program(props) {
  const [dayTime, setDayTime] = useState(1);
  const [contentList, setContentList] = useState([]);
  const [noteList, setNoteList] = useState([]);

  const { time, setTime, setPrograms } = useContext(TourContext);

  const contents = useRef([]);
  const notes = useRef([]);
  const programList = useRef([]);
  const data = useRef(1);

  const { enqueueSnackbar } = useSnackbar();

  const programLenght = dayTime ? parseInt(dayTime) : 1;

  const handleIncreaseDayTime = () => {
    if (dayTime < 7) {
      setDayTime((prev) => prev + 1);
      setTime(`${dayTime + 1} days ${dayTime} nights`);
    } else {
      enqueueSnackbar("A tour does not last more than 1 week.", { variant: "error" });
      setDayTime(7);
      setTime(`7 days 6 nights`);
    }
  };
  const handleDecreaseDayTime = () => {
    if (dayTime - 1 > 1) {
      setDayTime((prev) => prev - 1);
      setTime(`${dayTime - 1} days ${dayTime - 2} nights`);
    } else {
      if (dayTime - 1 === 1) {
        setDayTime(1);
        setTime("1 day 1 night");
      } else if (dayTime - 1 < 1) {
        enqueueSnackbar("A tour lasting at least 1 day.", { variant: "error" });
      }
    }
  };

  // -------handel when any change in content of program-----
  useEffect(() => {
    const setData = () => {
      [...new Array(programLenght)].map((i, index) => {
        programList.current[index] = {
          content: contentList[index],
          note: noteList[index],
        };
      });
      setPrograms([...programList.current]);
    };

    setData();
  }, [data.current]);

  const handleChangeContent = (e, index) => {
    contents.current[index] = e.target.value;
    setContentList([...contents.current]);
    data.current = Math.random();
  };

  const handleChangeNote = (e, index) => {
    notes.current[index] = e.target.value;
    setNoteList([...notes.current]);
    data.current = Math.random();
  };

  return (
    <>
      <Grid item xs={4}>
        <div className={cx("day-time")}>
          <TextField
            disabled
            label="day time"
            value={dayTime}
            variant="outlined"
            fullWidth
            className={cx("text-field")}
          />
          <div className={cx("day-time-icon")}>
            <FontAwesomeIcon
              icon={faCaretUp}
              className={cx("icon")}
              onClick={handleIncreaseDayTime}
            />
            <FontAwesomeIcon
              icon={faCaretDown}
              className={cx("icon")}
              onClick={handleDecreaseDayTime}
            />
          </div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <TextField
          disabled
          value={time}
          variant="outlined"
          fullWidth
          className={cx("text-field")}
        />
      </Grid>

      <Grid item xs={12}>
        {[...new Array(programLenght)].map((i, index) => {
          return (
            <div className={cx("actions")} key={index}>
              <p>Day {index + 1}</p>
              <div className={cx("actions-content")}>
                <TextField
                  fullWidth
                  label="content"
                  multiline
                  rows={3}
                  className={cx("text-field")}
                  sx={{ mt: 1 }}
                  onChange={(e) => handleChangeContent(e, index)}
                />
                <TextField
                  fullWidth
                  label="note"
                  multiline
                  rows={3}
                  className={cx("text-field")}
                  sx={{ mt: 1 }}
                  onChange={(e) => handleChangeNote(e, index)}
                />
              </div>
            </div>
          );
        })}
      </Grid>
    </>
  );
}

export default Program;
