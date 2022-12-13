import React, { useContext, useState } from "react";
import { useSnackbar } from "notistack";

import { Avatar, Button, Grid, TextField } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
} from "@fortawesome/free-brands-svg-icons";

import styles from "./ContactPage.module.scss";
import classNames from "classnames/bind";

import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import { LoadingContext } from "../../../../Context/LoadingContext";
import Progress from "../../../../components/Progress";
import request from "../../../../Utils/request";

const cx = classNames.bind(styles);

function ContactPage(props) {
  // ------------state----------
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  // -----------context------------
  const { loading } = useContext(LoadingContext);

  // ----------snackbar----------
  const { enqueueSnackbar } = useSnackbar();

  // ---------handle send feedback--------
  const handleSendFeedback = async () => {
    if (name === "" || phone === "" || email === "" || content === "") {
      enqueueSnackbar("please fill full of feedback's information", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Your feedback has been sent to admin!", {
        variant: "success",
      });
      try {
        await request.post("/send-mail", {
          name,
          phone,
          email,
          content,
        });
      } catch (error) {}
    }
  };

  return loading ? (
    <Progress />
  ) : (
    <div>
      <Header />

      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("Contact-title")}>Contact us</div>
          <p>
            If our available tours and service are not at your interest or you
            are still not sure about it and want to get more information? We are
            here to support you. For a better performance, your ideas about your
            cruise such as level of service (luxury/ deluxe/ budget), type of
            tours (group/ private), your group size, time, duration and purpose
            of your trip (honeymoon, sightseeing, anniversary, family fun,
            adventure),... then we will get back to you at soonest possible with
            a most comprehensive proposal.
          </p>
          <h3>Give us your feedback</h3>
          <p>
            Please leave your contact information and request that we will
            respond to you as soon as possible.
          </p>

          <form action="" className={cx("form")}>
            <Grid container>
              <Grid item xs={3}>
                <div className={cx("label")}>
                  Full name <span>*</span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  className={cx("input")}
                  sx={{ mt: 2 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={3}>
                <div className={cx("label")}>
                  Phone number <span>*</span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  className={cx("input")}
                  sx={{ mt: 2 }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>

              <Grid item xs={3}>
                <div className={cx("label")}>
                  Email <span>*</span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  className={cx("input")}
                  sx={{ mt: 2 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={3}>
                <div className={cx("label")}>
                  Content <span>*</span>
                </div>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  className={cx("input")}
                  inputProps={{ style: { fontSize: "1.6rem" } }}
                  sx={{ mt: 2 }}
                  multiline
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Grid>

              <Grid item xs={3}></Grid>
              <Grid item xs={9}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ fontSize: "1.6rem", fontWeight: "bold", m: "2rem 0" }}
                  onClick={() => handleSendFeedback()}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>

        <div className={cx("contact")}>
          <div className={cx("contact-content")}>
            <div className={cx("avt")}>
              <Avatar
                sx={{ width: 90, height: 90 }}
                src="http://thanglongosc.edu.vn/wp-content/uploads/2016/08/tuyen-nhan-vien-tu-van-xuat-khau-lao-dong.jpg"
              />
            </div>
            <div className={cx("main-content")}>
              <p>Online support</p>
              <div className={cx("contact-number")}>
                <PhoneIcon sx={{ fontSize: "2.6rem", mr: 1 }} />
                <span>0912 179 357 - 0868 1616 46</span>
              </div>
              <div className={cx("contact-zalo")}>
                <div>Zalo 1: 0868161646</div>
                <div>Zalo 2: 0912179357</div>
              </div>
            </div>
          </div>
          <div className={cx("contact-social-network")}>
            <div className={cx("social-network", "facebook")}>
              <FontAwesomeIcon icon={faSquareFacebook} />
              <span>Facebook</span>
            </div>
            <a href="http://www.facebook.com/">http://www.facebook.com/</a>
            <div className={cx("social-network", "instagram")}>
              <FontAwesomeIcon icon={faSquareInstagram} />
              <span>Instagram</span>
            </div>
            <a href="http://www.instagram.com/">http://www.instagram.com/</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage;
