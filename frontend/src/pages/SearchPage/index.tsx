import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const [_, searchText] = location.search.split("?searchText=");
    if (!searchText) {
      navigate("/", { replace: true });
    }
    console.log(searchText);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Search | NuerEats</title>
      </Helmet>
      <div>text</div>
    </div>
  );
};

export default SearchPage;
