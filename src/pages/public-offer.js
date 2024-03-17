import React, { useEffect } from 'react';
import * as styles from './contact-us.module.css';

import Banner from '../components/Banner';
import Layout from '../components/Layout/Layout';
import Container from '../components/Container';
import PublicOffer from '../components/PublicOffer';

const PublicOfferPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <Banner
          maxWidth={'650px'}
          name={'Умови договору купівлі-продажу'}
          bgImage={'/support.png'}
          color={'var(--standard-white)'}
          height={'350px'}
        />

        <div className={styles.pageContainer}>
          <Container size={'large'} spacing={'min'}>
            <PublicOffer />
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default PublicOfferPage;
