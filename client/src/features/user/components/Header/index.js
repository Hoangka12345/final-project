import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";
import queryString from "query-string";

import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import { Avatar, Button, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../../../assets/logo.png";
import { headerDatas } from "../../../../components/Data";
import Menu from "./Menu";
import request from "../../../../Utils/request";
import { URL_AVT } from "../../../../components/Constants";
import { LoadingContext } from "../../../../Context/LoadingContext";

const cx = classNames.bind(styles);

function Header(props) {
  // -------------state--------------
  const [viewMore, setViewMore] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // ------------context-------
  const { setLoading } = useContext(LoadingContext);

  // ---------------router-dom---------------
  const navigate = useNavigate();

  // --------notistack----------
  const { enqueueSnackbar } = useSnackbar();

  // ----------------react-cookies-------------
  const [cookie, setCookie, removeCookie] = useCookies();

  // -------------call api get user info--------------
  useEffect(() => {
    (async () => {
      if (cookie["token"] || cookie["role"] == 1) {
        try {
          const res = await request.get("/");
          if (res.status === 200) {
            setUserInfo(res.data.user);
          }
        } catch (error) {
          console.log(error.response);
        }
      }
    })();
  }, []);

  // ----------------handle when user click tours in navbar-------------
  const handleClickAllTours = () => {
    navigate({
      pathname: "/tours",
    });
  };

  // ----------------handle when user click any place in navbar-------------
  const handleNavigateToToursPage = (item) => {
    navigate({
      pathname: "/tours",
      search: queryString.stringify({ _key: item }),
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleNavigateHistory = () => {
    if (cookie["token"]) {
      navigate({
        pathname: "/history",
        search: queryString.stringify({ _page: 1 }),
      });
    } else {
      enqueueSnackbar("please login before!", { variant: "error" });
    }
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("logo")} onClick={() => navigate("/")}>
          <img src={Logo} alt="" />
        </div>
        <div className={cx("content")}>
          <div className={cx("content-item", "content-item_menu")}>
            <span onClick={handleClickAllTours}>Tours</span>
            <div
              className={cx("menu_tour")}
              onMouseLeave={() => setViewMore(false)}
            >
              <div className={cx("menu-container")}>
                {!viewMore ? (
                  <div className={cx("main-content")}>
                    {headerDatas.map((data) => {
                      return (
                        <div key={data.id}>
                          <div className={cx("menu-title")}>{data.title}</div>
                          {data.items.map((item) => {
                            return (
                              <div
                                className={cx("menu-item")}
                                key={item}
                                onClick={() => handleNavigateToToursPage(item)}
                              >
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                    <div>
                      <div className={cx("menu-title")}>Travel Style</div>
                      <div
                        className={cx("menu-item")}
                        onClick={() => handleNavigateToToursPage("explore")}
                      >
                        Explore - experience
                      </div>
                      <div
                        className={cx("menu-item")}
                        onClick={() => handleNavigateToToursPage("resort")}
                      >
                        Resort
                      </div>
                      <div
                        className={cx("menu-item")}
                        onClick={() =>
                          handleNavigateToToursPage("team building")
                        }
                      >
                        Team Building
                      </div>
                      <div
                        className={cx("menu-item")}
                        onClick={() =>
                          handleNavigateToToursPage("culinary culture")
                        }
                      >
                        Culinary culture
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={cx("icon-view-more")}>
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        style={{ fontSize: "2.5rem", cursor: "pointer" }}
                        onClick={() => setViewMore(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={cx("content-item")}
            onClick={() => handleNavigateHistory()}
          >
            Tour Booking History
          </div>
          <div
            className={cx("content-item")}
            onClick={() => navigate("/contact")}
          >
            Contacts
          </div>
        </div>
        {userInfo.username ? (
          <div className={cx("user-info")}>
            <div className={cx("info-detail")}>
              <Avatar alt="Remy Sharp" src={`${URL_AVT}/${userInfo.avatar}`} />
              <p>{userInfo ? userInfo.username : ""}</p>
            </div>
            <Menu setUserInfo={setUserInfo} />
          </div>
        ) : (
          <div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--primary-color)",
                fontSize: "1.4rem",
                fontWeight: "bold",
                "&: hover": { backgroundColor: "#d39c5d" },
              }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--primary-color)",
                fontSize: "1.4rem",
                fontWeight: "bold",
                ml: 1,
                "&: hover": { backgroundColor: "#d39c5d" },
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
