import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";
import styles from './Header.module.scss';

const GET_MAIN_NAV = gql`
  query GetMainNav {
    menu(id: "mainNav", idType: SLUG) {
      id
      name
      slug
      menuItems {
        nodes {
          id
          label
          url
          path
          target
          title
          order
          childItems {
            nodes {
              id
              label
              url
              path
              target
              title
              order
            }
          }
        }
      }
    }
  }
`;

const Header = () => {
    const { loading, error, data } = useQuery(GET_MAIN_NAV);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    if (!data.menu) {
      return <div>nav not found</div>;
    }

    console.log(data.menu.menuItems);
  
    const nav = data.menu;
    
    return (
    <header className={styles.siteHeader} id="header" >
      <div className={styles.Inner}>
        <nav className={styles.primaryNavigation}>
          <div className={styles.headerMenu}>
              <ul className={styles.mainNav + " list-unstyled"}>
                  {nav.menuItems.nodes.map((item, index) => (
                    <li key={index} className={styles.menuItem}>
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                  ))}
              </ul>
          </div>
        </nav>
        <div className={styles.menuToggle}>
            <div className={styles.hamburger}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.cross}>
              <span></span>
              <span></span>
            </div>
        </div>
      </div>
    </header>
    );
  };
  
  export default Header;