import React from "react";

import styles from "./Program.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const plans = {
  id: 1,
  title: "Hai Phong City ",
  content: [
    {
      day: 1,
      contentDetail:
        "Xe và Hướng dẫn viên (HDV) công ty Vietnam Booking đón đoàn tại điểm hẹn. Đoàn khởi hành đi đến thành phố Phan Thiết, bắt đầu chương trình tour Phú Quý 2N2Đ.",
      note: "Nếu quý khách đăng ký đi bằng xe giường nằm (số lượng khách đoàn dưới 25 người). Quý khách sẽ di chuyển ra bến xe Lê Hồng Phong, Quận 5 để tập trung đón khách",
    },
    {
      day: 2,
      contentDetail:
        "Cập bến đất liền, xe đưa quý khách đi dùng bữa trưa tại nhà hàng. Sau đó, xe lại đưa đoàn khách về đến TP.HCM.",
      note: "Thứ tự và chi tiết trong chương trình có thể thay đổi cho phù hợp với tình hình thực tế, nhưng vẫn đảm bảo đủ điểm đến tham quan!",
    },
    {
      day: 3,
      contentDetail:
        "Xe và Hướng dẫn viên (HDV) công ty Vietnam Booking đón đoàn tại điểm hẹn. Đoàn khởi hành đi đến thành phố Phan Thiết, bắt đầu chương trình tour Phú Quý 2N2Đ.",
      note: "Nếu quý khách đăng ký đi bằng xe giường nằm (số lượng khách đoàn dưới 25 người). Quý khách sẽ di chuyển ra bến xe Lê Hồng Phong, Quận 5 để tập trung đón khách",
    },
  ],
};

function Program(props) {
  // ---------props--------------------
  const { tour } = props;
  const programs = tour.program ? tour.program : [];

  return (
    <div className={cx("wrapper")}>
      {programs.length > 0 &&
        programs.map((data, index) => {
          return (
            <div className={cx("item")} key={data._id}>
              <div className={cx("title")}>
                Day {index + 1}: {tour.title && tour.title}{" "}
              </div>
              <div className={cx("action")}>{data.content}</div>
              <div className={cx("note")}>
                <span>Note: </span>
                <span>{data.note}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Program;
