import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";
import PageTransition from '../Components/PageTransition';
import FlexibleContent from '../Components/FlexibleContent';

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
        ... on TheFlexMasterFlexLargeTextLayout {
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
  
  return (
    <PageTransition>
      <div className="front-page">
        <FlexibleContent flexibleContent={data.page?.theFlex} />
      </div>
    </PageTransition>
  );
};

export default Home;