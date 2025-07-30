import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";

const GET_MENU = gql`
  {
    teMenu {
      edges {
        node {
          title
          slug
          menuFlex {
            __typename
            ... on MenuFlex {
              menuSection {
                sectionTitle
                sectionText
                foodDrinks {
                  price
                  description
                }
                cta {
                  url
                  title
                  target
                }
              }
            }
          }
        }
      }
    }
  }
`;

const SingleMenu = () => {
  const { loading, error, data } = useQuery(GET_MENU);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  console.log(data);
  
  return (
    <div className="menus container">
        <h1>Menus</h1>
        {
            data.teMenu.edges.map((teMenu, key) => {
                return (
                <div key={key}>
                    <h3>
                        {teMenu.node.title}
                    </h3>
                </div>
                )
            })
        }
    </div>
  );
};

export default SingleMenu;