import React, { useRef, useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

import { Avatar, Button, Tooltip } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import NearMeIcon from "@mui/icons-material/NearMe";

import styles from "./Feedback.module.scss";
import classNames from "classnames/bind";

import Comment from "./Comment";
import request from "../../../../../Utils/request";
import { URL_AVT } from "../../../../../components/Constants";

const cx = classNames.bind(styles);

function Feedback(props) {
  // -----------props-------------
  const { socket } = props;

  // --------state-----------------
  const [viewAll, setViewAll] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsDisplay, setCommentsDisplay] = useState([]);
  const [user, setUser] = useState({});

  // -----------router-dom-----------------
  const location = useLocation();

  // ---------useRef-----------------
  const params = useRef(queryString.parse(location.search));
  const isBooking = useRef(false);

  // -------------cookie-------------
  const [cookie, setCookie, removeCookie] = useCookies();

  // -----------snackbar----------------
  const { enqueueSnackbar } = useSnackbar();

  // -----------call api get Feedback --------------------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get(`/tour/show/${params.current._id}`);
        const feedbacks = res.data.feedback;
        setComments(feedbacks);
        setCommentsDisplay(feedbacks);
      } catch (error) {}
    })();
  }, []);

  // -----------call api to get all bookings-----------
  useEffect(() => {
    (async () => {
      if (cookie["token"] && cookie["role"] == 1) {
        try {
          const res = await request.get("/booking/show");
          if (res.status === 200) {
            const check = res.data.bookings.filter(
              (booking) => booking.tourId === params.current._id
            );
            if (check[0]) {
              isBooking.current = true;
              return;
            } else {
              isBooking.current = false;
              return;
            }
          }
        } catch (error) {}
      }
    })();

    (async () => {
      try {
        const res = await request.get("");
        if (res.status === 200) {
          setUser(res.data.user);
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    socket?.on("comment", (data) => {
      setComments((prev) => [data, ...prev]);
      setCommentsDisplay((prev) => [data, ...prev]);
    });
  }, [socket]);

  // ----handle click view more button in comment-----
  const handleClickViewAllCmt = () => {
    setCommentsDisplay(comments);
    setViewAll(true);
  };

  // ----handle click hide button in comment-----
  const handleClickHideCmt = () => {
    setCommentsDisplay(comments.slice(0, 5));
    setViewAll(false);
  };

  // -----------handle when user send feedback----------------------
  const handlePostFeedback = async () => {
    if (!cookie["token"] || !cookie["role"] || cookie["role"] != 1) {
      enqueueSnackbar("Please login before giving feedback!", {
        variant: "error",
      });
      return;
    } else {
      try {
        const data = {
          username: user.username,
          userId: user._id,
          tourId: params.current._id,
          content: comment,
          avatar: user.avatar,
        };
        // -------handle socket io-----------

        socket.emit("comment", data);
        setComments((prev) => [
          {
            username: user.username,
            avatar: user.avatar,
            content: comment,
            createdAt: new Date(),
          },
          ...prev,
        ]);
        setCommentsDisplay((prev) => [
          {
            username: user.username,
            content: comment,
            avatar: user.avatar,
            createdAt: new Date(),
          },
          ...prev,
        ]);
        setComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ---------------handle whrn user use Enter to post comment------------
  const handleEnterComment = (e) => {
    if (e.key === "Enter") {
      handlePostFeedback();
    }
  };

  const showComments = useMemo(() => {
    const arr = commentsDisplay.sort((a, b) => b.createdAt - a.createdAt);
    if (arr.length > 5) {
      if (viewAll) {
        return arr;
      } else {
        return arr.slice(0, 5);
      }
    } else {
      return arr;
    }
  }, [comments, viewAll]);

  console.log(isBooking.current);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("number-comment")}>
        {comments.length == 0
          ? "No feedback in this tour"
          : comments.length == 1
          ? "1 comment"
          : `${comments.length} comments`}{" "}
      </div>
      <div className={cx("input-comment")}>
        <Avatar src={`${URL_AVT}/${user.avatar ?? ""}`} />
        <div className={cx("input")}>
          {isBooking.current ? (
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleEnterComment}
            />
          ) : (
            <Tooltip
              title="you haven't experienced this tour yet!"
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: "1rem",
                  },
                },
              }}
            >
              <input type="text" disabled />
            </Tooltip>
          )}
          <NearMeIcon
            className={cx("comment-icon")}
            color="info"
            sx={{ fontSize: "2.5rem" }}
            onClick={handlePostFeedback}
          />
        </div>
      </div>
      {showComments.map((comment, index) => {
        return <Comment key={index} comment={comment} />;
      })}
      {comments.length > 5 &&
        (viewAll ? (
          <div className={cx("view-more")}>
            <Button sx={{ fontSize: "1.6rem" }} onClick={handleClickHideCmt}>
              Ẩn bớt
              <ArrowDropUpIcon color="primary" sx={{ fontSize: "3rem" }} />
            </Button>
          </div>
        ) : (
          <div className={cx("view-more")}>
            <Button sx={{ fontSize: "1.6rem" }} onClick={handleClickViewAllCmt}>
              Xem thêm
              <ArrowDropDownIcon color="primary" sx={{ fontSize: "3rem" }} />
            </Button>
          </div>
        ))}
    </div>
  );
}

export default Feedback;
