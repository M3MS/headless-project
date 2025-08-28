import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";
import PageTransition from '../Components/PageTransition';
import FlexibleContent from '../Components/FlexibleContent';

const GET_MENUS_PAGE = gql`
  {
    # Get the teMenus custom post type listing
    teMenus {
      edges {
        node {
          title
          slug
          id
        }
      }
    }
    
    page(id: "menus", idType: URI) {
      title
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
          ... on TheFlexMasterFlexLargeTextLayout {
            text
            mainTitle
            cta {
              url
              title
              target
            }
          }
          # Add other flexible content types as needed
        }
      }
    }
  }
`;

const Menus = () => {
  const { loading, error, data } = useQuery(GET_MENUS_PAGE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  console.log(data);
  
  return (
    <PageTransition>
      <div className="menus">
        <FlexibleContent flexibleContent={data.page?.theFlex} />
        <div className="menus-listing container">
          {data.teMenus.edges.map((teMenus, key) => {
            return (
              <div key={key}>
                <h3>
                  <Link to={`/menus/${teMenus.node.slug}`}>{teMenus.node.title}</Link>
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </PageTransition>
  );
};

export default Menus;