import React, { useContext, useEffect, useRef, useState } from "react";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import styles from "./Slide.module.scss";
import classNames from "classnames/bind";

import { TourContext } from "../../EditTourPage";
import { Button } from "@mui/material";
import SlideImage from "../../../../../components/SlideImage";

const cx = classNames.bind(styles);

function Slide(props) {
  // ------------state----------
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);
  const [isChangeFiles, setIsChangeFiles] = useState(false);

  // ----------------context--------------
  const { title, thumbnailDisplay, setThumbnailDisplay, setThumbnail } =
    useContext(TourContext);

  // -----------useRef--------------
  const sildeList = useRef([]);

  // ------------handle set active class when user change image----------------
  useEffect(() => {
    setActive(index);
    setThumbsSwiper();
  }, [index]);

  // ----------------handle click prev of slide----------
  const handleClickPrev = () => {
    if (index - 1 < 0) {
      setIndex(thumbnailDisplay.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  // ----------------handle click next of slide----------
  const handleClickNext = () => {
    if (index + 1 >= thumbnailDisplay.length) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  // ----------handle when user choose file---------------
  const handleChooseFileUpdate = (e) => {
    const files = e.target.files;
    if (files[0]) {
      setThumbnail([]);
      for (let i = 0; i < files.length; i++) {
        setThumbnail((prev) => [...prev, files[i]]);
        sildeList.current[i] = URL.createObjectURL(files[i]);
        setThumbnailDisplay([...sildeList.current]);
        URL.revokeObjectURL(files[i]);
      }
      setIsChangeFiles(true);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <SlideImage
        images={thumbnailDisplay}
        active={active}
        setActive={setActive}
        index={index}
        setIndex={setIndex}
        handleClickPrev={handleClickPrev}
        handleClickNext={handleClickNext}
        isChangeFiles={isChangeFiles}
        thumbsSwiper={thumbsSwiper}
        setThumbsSwiper={setThumbsSwiper}
      />

      <div className={cx("choose-file")}>
        <div className={cx("choose-file_icon")}>
          <Button component="label">
            <AddPhotoAlternateIcon
              sx={{ fontSize: "4.5rem", color: "#4a4ac1" }}
            />
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleChooseFileUpdate}
            />
          </Button>
        </div>
        <p>choose image to make your slide</p>
      </div>
    </div>
  );
}

export default Slide;
