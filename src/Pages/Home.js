import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";

const GET_HOME = gql`
{
  page(id: "home", idType: URI) {
    theFlex {
      masterFlex {
        __typename
        ... on TheFlexMasterFlexHeroSliderLayout {
          __typename
          slide {
            image {
              node {
                srcSet
                altText
              }
            }
          }
        }
        __typename
        ... on ModuleLargeText_Fields {
          text
          mainTitle
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
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_HOME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  console.log(data);
  
  return (
    <div className="front-page container">
        <h1>Home</h1>
        
    </div>
  );
};

export default Home;