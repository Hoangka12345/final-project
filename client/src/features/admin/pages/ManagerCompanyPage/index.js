import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import styles from "./ManagerCompanyPage.module.scss";
import classNames from "classnames/bind";

import Layout from "../../components/Layout";
import request from "../../../../Utils/request";
import StyledTable from "../../components/StyledTable";

const cx = classNames.bind(styles);

function ManagerCompanyPage(props) {
  const [companies, setCompanies] = useState([]);
  const [companiesSearch, setCompaniesSearch] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  // --------router-dom----------
  const location = useLocation();

  // --------useRef----------
  const currentCompanies = useRef([]);

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
        const res = await request.get("admin/user/showcompanies");
        if (res.status === 200) {
          setCompanies(res.data.companies);
          setCompaniesSearch(res.data.companies);
          setIsLoad(!isLoad);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // --------handle search----------------
  useEffect(() => {
    const newUsers = companies.filter((company) => {
      const search = queryParams._key.toLowerCase();
      return company.username.toLowerCase().match(new RegExp(search, "g"));
    });
    setCompaniesSearch(newUsers);
    setIsLoad(!isLoad);
  }, [queryParams._key]);

  const first = (queryParams._page - 1) * 5;
  const last = queryParams._page * 5;
  currentCompanies.current = companiesSearch.slice(first, last);

  return (
    <Layout>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <StyledTable
            currentUsers={currentCompanies}
            usersSearch={companiesSearch}
            isLoad={isLoad}
            setIsLoad={setIsLoad}
          />
        </div>
      </div>
    </Layout>
  );
}

export default ManagerCompanyPage;
