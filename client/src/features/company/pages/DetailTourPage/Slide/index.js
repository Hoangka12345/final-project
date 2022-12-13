import React, { useEffect, useState } from "react";
import SlideImage from "../../../../../components/SlideImage";

const Slide = (props) => {
  // ---------prop-------------
  const { images } = props;

  // ------------state----------
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);
  const [isChangeFiles, setIsChangeFiles] = useState(false);

  // ------------handle set active class when user change image----------------
  useEffect(() => {
    setActive(index);
    setThumbsSwiper();
  }, [index]);

  // ----------------handle click prev of slide----------
  const handleClickPrev = () => {
    if (index - 1 < 0) {
      setIndex(images.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  };

  // ----------------handle click next of slide----------
  const handleClickNext = () => {
    if (index + 1 >= images.length) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <SlideImage
      images={images}
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
  );
};

export default Slide;
