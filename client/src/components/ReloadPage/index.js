import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { LoadingContext } from "../../Context/LoadingContext";

function ReloadPage({ children }) {
  const location = useLocation();

  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }

    setLoading(true);
    const timeOut = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [location.pathname]);
  return <div>{children}</div>;
}

export default ReloadPage;
