import React, { useContext } from 'react';
import { Link } from 'gatsby';

import Icon from '../Icons/Icon';
// import { LocalizationContext } from '../../context/LocalizationContext';

import * as styles from './BreadCrumbs.module.css';

const Breadcrumbs = ({ crumbs }) => {
  let crumbsOutput = crumbs;
  if (crumbsOutput && typeof crumbsOutput !== 'object') {
    if (crumbsOutput.indexOf('>') > -1) {
      crumbsOutput = crumbsOutput.split('>');
    } else {
      crumbsOutput = [crumbsOutput];
    }
  }

  const t = (k) => k;
  // const { t } = useContext(LocalizationContext);

  return (
    <div data-breadcrumbs className={styles.breadcrumbs}>
      {crumbsOutput &&
        crumbsOutput.map((crumb, crumbIndex) => (
          <span key={crumbIndex}>
            {crumbIndex > 0 && (
              <span className={styles.spacer}>
                <Icon symbol={'caret'}></Icon>
              </span>
            )}
            {typeof crumb === 'object' && 'link' in crumb && (
              <Link className={styles.crumb} to={crumb.link}>
                {t(crumb.label)}
              </Link>
            )}
            {typeof crumb === 'object' && !('link' in crumb) && (
              <span className={styles.crumb}>{t(crumb.label)}</span>
            )}
            {typeof crumb !== 'object' && (
              <span className={styles.crumb}>{t(crumb)}</span>
            )}
          </span>
        ))}
    </div>
  );
};

export default Breadcrumbs;
