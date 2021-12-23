import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gql, useLazyQuery } from "@apollo/client";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragment";
import { category, categoryVariables } from "../../__generated__/category";

export const CATEGORY_QUERY = gql`
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

export const Category = () => {
  const params = useParams();
  const { slug } = params;

  const [queryReadyToStart, { data }] = useLazyQuery<category, categoryVariables>(CATEGORY_QUERY);

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
  }, []);

  return (
    <div>
      <Helmet>
        <title>Category | Giraffe</title>
      </Helmet>
    </div>
  );
};
