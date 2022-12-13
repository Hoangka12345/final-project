import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import styles from "./ManagerUserPage.module.scss";
import classNames from "classnames/bind";

import Layout from "../../components/Layout";
import request from "../../../../Utils/request";
import StyledTable from "../../components/StyledTable";

const cx = classNames.bind(styles);

function ManagerUserPage(props) {
  // --------state----------
  const [users, setUsers] = useState([]);
  const [usersSearch, setUsersSearch] = useState([]);

  const [isLoad, setIsLoad] = useState(false);

  // --------router-dom----------
  const location = useLocation();

  // --------useRef----------
  const currentUsers = useRef([]);

  // --------useMemo----------
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: params._page || 1,
      _key: params._key || "",
    };
  }, [location.search]);

  // --------call api to get all users---------
  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("admin/user/showusers");
        if (res.status === 200) {
          setUsers(res.data.users);
          setUsersSearch(res.data.users);
          setIsLoad(!isLoad);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // --------handle search----------------
  useEffect(() => {
    const newUsers = users.filter((user) => {
      const search = queryParams._key.toLowerCase();
      return user.username.toLowerCase().match(new RegExp(search, "g"));
    });
    setUsersSearch(newUsers);
    setIsLoad(!isLoad);
  }, [queryParams._key]);

  const first = (queryParams._page - 1) * 5;
  const last = queryParams._page * 5;
  currentUsers.current = usersSearch.slice(first, last);

  return (
    <Layout>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <StyledTable
            currentUsers={currentUsers}
            usersSearch={usersSearch}
            isLoad={isLoad}
            setIsLoad={setIsLoad}
          />
        </div>
      </div>
    </Layout>
  );
}

export default ManagerUserPage;
