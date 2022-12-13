import React, { useContext, useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";

import { Grid, TextField } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Program.module.scss";
import classNames from "classnames/bind";

import { TourContext } from "../../index";
import { faCaretDown, faCaretUp, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Program(props) {
  const [dayTime, setDayTime] = useState(1);
  const [contentList, setContentList] = useState([]);
  const [noteList, setNoteList] = useState([]);

  const { time, setTime, Programs, setPrograms } = useContext(TourContext);

  const contents = useRef([]);
  const notes = useRef([]);
  const programList = useRef([]);
  const data = useRef(1);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const newDayTime = parseInt(time.charAt(0));
    setDayTime(newDayTime);
  }, [time]);

  const handleIncreaseDayTime = () => {
    if (dayTime < 7) {
      setDayTime((prev) => prev + 1);
      setTime(`${dayTime + 1} days ${dayTime} nights`);
      setPrograms((prev) => [...prev, { content: "", note: "" }]);
    } else {
      enqueueSnackbar("A tour does not last more than 1 week.", { variant: "error" });
      setDayTime(7);
      setTime(`7 days 6 nights`);
    }
  };

  const handleDecreaseDayTime = () => {
    if (dayTime > 1) {
      setDayTime((prev) => prev - 1);
      setTime(`${dayTime - 1} days ${dayTime - 2} nights`);
      const newPrograms = [...Programs].filter((data, index) => index !== Programs.length - 1);
      setPrograms(newPrograms);
    } else {
      setDayTime(1);
      setTime("1 day 1 night");
      enqueueSnackbar("A tour lasting at least 1 day.", { variant: "error" });
    }
  };

  const setContentAndNoteOfPrograms = () => {
    Programs.map((program, index) => {
      contents.current[index] = program.content;
      notes.current[index] = program.note;
    });
    setContentList([...contents.current]);
    setNoteList([...notes.current]);
  };

  const handleChangeContent = (e, index) => {
    setContentAndNoteOfPrograms();
    contents.current[index] = e.target.value;
    setContentList([...contents.current]);
    data.current = Math.random();
  };

  const handleChangeNote = (e, index) => {
    setContentAndNoteOfPrograms();
    notes.current[index] = e.target.value;
    setNoteList([...notes.current]);
    data.current = Math.random();
  };

  // -------handel when any change in content of program-----
  useEffect(() => {
    const setData = () => {
      [...new Array(dayTime)].map((i, index) => {
        programList.current[index] = {
          content: contentList[index],
          note: noteList[index],
        };
      });
      setPrograms([...programList.current]);
    };

    setData();
  }, [data.current]);

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
        {Programs.map((data, index) => {
          return (
            <div className={cx("actions")} key={index}>
              <p>Day {index + 1}</p>
              <div className={cx("actions-content")}>
                <TextField
                  fullWidth
                  label="content"
                  value={data.content}
                  multiline
                  rows={3}
                  className={cx("text-field")}
                  sx={{ mt: 2 }}
                  onChange={(e) => handleChangeContent(e, index)}
                />
                <TextField
                  fullWidth
                  label="note"
                  value={data.note}
                  multiline
                  rows={3}
                  className={cx("text-field")}
                  sx={{ mt: 2 }}
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
