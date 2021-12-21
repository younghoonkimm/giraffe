import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useLazyQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import { searchRestaurant, searchRestaurantVariables } from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [queryReadyToStart, { loading, data }] = useLazyQuery<searchRestaurant, searchRestaurantVariables>(
    SEARCH_RESTAURANT
  );

  useEffect(() => {
    const [_, searchText] = location.search.split("?searchText=");
    if (!searchText) {
      return navigate("/", { replace: true });
    }
    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          query: searchText,
        },
      },
    });
  }, []);

  console.log(data);

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
