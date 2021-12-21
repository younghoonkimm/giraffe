import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragment";
import { category, categoryVariables } from "../../__generated__/category";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

const Category = () => {
  const params = useParams();
  const { slug } = params;

  const [queryReadyToStart, { data, loading }] = useLazyQuery<category, categoryVariables>(CATEGORY_QUERY);

  useEffect(() => {
    if (slug) {
      queryReadyToStart({
        variables: {
          input: {
            page: 1,
            slug,
          },
        },
      });
    }
    console.log(data);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Search | NuerEats</title>
      </Helmet>
    </div>
  );
};

export default Category;
