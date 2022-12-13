import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";

import { Avatar } from "@mui/material";

import styles from "./Comment.module.scss";
import classNames from "classnames/bind";

import { URL_AVT } from "../../../../../../components/Constants";

const cx = classNames.bind(styles);

function Comment(props) {
  // -----------props----------
  const { comment } = props;

  // ----------state------------
  const [time, setTime] = useState(
    comment.createdAt && moment(new Date(comment.createdAt)).fromNow()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment(new Date(comment.createdAt)).fromNow());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={cx("wrapper")}>
      <Avatar src={`${URL_AVT}/${comment.user ? comment.user[0].avatar : comment.avatar ?? ""}`} />
      <div className={cx("comment")}>
        <div className={cx("info")}>
          <div className={cx("name")}>
            {comment.user ? comment.user[0].username : comment.username ?? ""}
          </div>
          <div className={cx("time")}>{time}</div>
        </div>
        <div className={cx("content")}>{comment.content && comment.content}</div>
      </div>
    </div>
  );
}

export default Comment;
