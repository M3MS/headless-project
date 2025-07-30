import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";

const GET_MENUS = gql`
  {
    teMenus {
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

const Menus = () => {
  const { loading, error, data } = useQuery(GET_MENUS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  console.log(data);
  
  // Add your JSX return here
  return (
    <div className="menus container">
        <h1>Menus</h1>
        {
            data.teMenus.edges.map((teMenus, key) => {
                return (
                <div key={key}>
                    <h3>
                        <Link to={`menu/${teMenus.node.slug}`}>{teMenus.node.title}</Link>
                    </h3>
                </div>
                )
            })
        }
    </div>
  );
};

export default Menus;