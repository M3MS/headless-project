import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link, useParams } from "react-router-dom";
import styles from './Menu.module.scss';

const GET_MENU = gql`
   query GetMenu($slug: ID!) {
    teMenu(id: $slug, idType: URI) {
      id
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
`;

const SingleMenu = () => {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(GET_MENU, {
    variables: { 
      slug: `/menus/${slug}/`
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (!data.teMenu) {
    return <div>Menu not found</div>;
  }
  
  console.log(data);

  const menu = data.teMenu;
  
  return (
    <div className={styles.singleMenu}>
      <div className="container">
          <h1 className="title">{menu.title}</h1>
          <div className="row">
            <div className="{styles.SideNav} col-md-2 col-10 offset-1">
              // NavMenu
            </div>
            {menu.menuFlex?.menuSection?.map((section, index) => (
              <div key={index} className="col-md-6 offset-md-1 col-10 offset-1">
                <div className="menu-section">

                  <h3 className="lead mb-sm">{section.sectionTitle}</h3>

                  {section.sectionText && <p>{section.sectionText}</p>}

                  {section.foodDrinks.map((foodItem, itemIndex) => (
                    <div key={itemIndex} className="food-item">
                      <span>{foodItem.description}</span>
                      <span className="price">{foodItem.price}</span>
                    </div>
                  ))}
                  {section.cta && (
                    <a className="icon-arrow-right mt-sm" href="{section.cta.url}" target="{section.cta.target}">{section.cta.title}</a>
                  )}
                </div>
              </div>
            ))}
            
          </div>
      </div>
    </div>
  );
};

export default SingleMenu;