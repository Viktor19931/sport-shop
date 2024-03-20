import React, { useEffect } from 'react';
import * as styles from './contact-us.module.css';

import Banner from '../components/Banner';
import Layout from '../components/Layout/Layout';
import Policy from '../components/Policy';
import Container from '../components/Container';

const PolicePage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={styles.root}>
        <Banner
          maxWidth={'650px'}
          name={'Політика конфіденційності'}
          bgImage={'/support.png'}
          color={'var(--standard-white)'}
          height={'350px'}
        />

        <div className={styles.pageContainer}>
          <Container size={'large'} spacing={'min'}>
            <Policy />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PolicePage;
