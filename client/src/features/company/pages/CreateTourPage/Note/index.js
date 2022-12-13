import React from "react";

import styles from "./Note.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const notes = [
  {
    label: "Title",
    description: "Name of your tour.",
  },
  {
    label: "Region",
    description: "In which region of Vietnam is your tour organized?",
  },
  {
    label: "City",
    description: "In which city of Vietnam is your tour organized?",
  },
  {
    label: "Departure time",
    description: "In week when can your tour depart?",
  },
  {
    label: "Introduction",
    description: "Briefly describe your tour to communicate the purpose of the tour to the user.",
  },
  {
    label: "Content",
    description:
      "Special activities can be included in your tour. Here you can add new activities (no more than 6) or remove inappropriate activities.",
  },
  {
    label: "Accompanying service",
    description: "Choose from the possible services when joining your tour.",
  },
  {
    label: "Service",
    description:
      "Enter specific services attached if the user registers to join your tour. Here you can add services (infinitely) or remove services that do not make sense.",
  },
  {
    label: "Transportation",
    description: "Possible transportation on your tour.",
  },
  {
    label: "Day time",
    description:
      "The time the user is on your tour. (The default time is the number of nights less than the number of days 1).",
  },
  {
    label: "program",
    description:
      "Appears when you enter daytime. Here, you enter the content and notes for each day of the tour.",
  },
  {
    label: "Type of Tour",
    description: "What type of tourism is your tour?",
  },
  {
    label: "Total tours",
    description:
      "Total tours ready to serve customers. (For example, this tour can currently accommodate 5 bookings at the same time.)",
  },
  {
    label: "Price",
    description: "your tour price (1 person) in VND",
  },
  {
    label: "Sale off",
    description: "Current discount is applicable on your tour (%)",
  },
];

function Note(props) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("note")}>
        <p>**NOTE FOR COMPANY**</p>
        <ul>
          {notes.map((note) => {
            return (
              <li key={note.label}>
                <span>{note.label}:</span>
                <span>{note.description}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Note;
