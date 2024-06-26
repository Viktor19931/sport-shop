import React, { useContext, useState } from 'react';
import { Link, navigate } from 'gatsby';

import Config from '../../config.json';
import Icon from '../Icons/Icon';
import { isAuth } from '../../helpers/general';

//TO DO: refactor this to handle multiple nested links to avoid hardcoding 'depth'
// have to restructure config.json
// refactor this

import * as styles from './MobileNavigation.module.css';
import { LocalizationContext } from '../../context/localizationContext';

const MobileNavigation = (props) => {
  const { close } = props;
  const { t } = useContext(LocalizationContext);

  const [subMenu, setSubMenu] = useState();
  const [category, setCategory] = useState();
  const [depth, setDepth] = useState(0);

  const handleLogout = () => {
    window.localStorage.removeItem('key');
    navigate('/');
    close();
  };

  return (
    <div className={styles.root}>
      <nav>
        <div className={styles.mobileNavContainer}>
          {/* dynamic portion */}
          {depth === 0 && (
            <div>
              {Config.headerLinks.map((navObject) => {
                const hasSubmenu =
                  navObject.category?.length !== undefined ? true : false;
                return (
                  <Link
                    key={navObject.menuLink}
                    className={`${styles.mobileLink}`}
                    to={hasSubmenu === true ? '' : navObject.menuLink}
                    onClick={() => {
                      if (hasSubmenu) {
                        setDepth(1);
                        setCategory(navObject);
                      }
                    }}
                  >
                    {t(navObject.menuLabel)}
                    {hasSubmenu && <Icon symbol={'caret'}></Icon>}
                  </Link>
                );
              })}
              <div className={styles.navFooter}></div>
            </div>
          )}

          {depth === 1 &&
            category.category.map((menuItem) => {
              return (
                <Link
                  key={menuItem.categoryLabel}
                  to={''}
                  onClick={() => {
                    setDepth(2);
                    setSubMenu(menuItem);
                  }}
                  className={`${styles.mobileLink}`}
                >
                  {menuItem.categoryLabel}
                  <Icon symbol={'caret'}></Icon>
                </Link>
              );
            })}

          {depth === 2 &&
            subMenu.submenu.map((menuItem) => {
              return (
                <Link
                  key={menuItem.menuLabel}
                  to={menuItem.menuLink}
                  className={`${styles.edgeLink}`}
                >
                  {menuItem.menuLabel}
                </Link>
              );
            })}

          {depth === -1 && (
            <>
              <div>
                <Link to={'/account/orders/'} className={styles.mobileLink}>
                  Orders
                </Link>
                <Link to={'/account/address/'} className={styles.mobileLink}>
                  Addresses
                </Link>
                <Link to={'/account/settings/'} className={styles.mobileLink}>
                  Settings
                </Link>
                <Link to={'/account/viewed/'} className={styles.mobileLink}>
                  Recently Viewed
                </Link>
              </div>
              <div className={styles.navFooter}>
                <div
                  className={styles.logoutContainer}
                  role={'presentation'}
                  onClick={handleLogout}
                >
                  <Icon symbol={'logout'} />
                  <span>Sign out </span>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
