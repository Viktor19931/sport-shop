import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import * as styles from './support.module.css';

import Banner from '../components/Banner';
import Contact from '../components/Contact';
import Layout from '../components/Layout/Layout';
import ThemeLink from '../components/ThemeLink';
import Policy from '../components/Policy';
import Container from '../components/Container';

const SupportPage = (props) => {
  const subpages = [
    { title: 'Shipping', key: 'shipping' },
    { title: 'Returns', key: 'returns' },
    { title: 'Payments & Security', key: 'payments' },
    { title: 'Terms & Conditions', key: 'terms' },
    { title: "Зв'яжіться з нами", key: 'contact' },
    { title: 'Privacy Policy', key: 'policy' },
  ];

  const [current, setCurrent] = useState(subpages[4]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.location.hash !== '' && props.location.hash !== undefined) {
      const hash = props.location.hash.substring(1);
      const tempCurrent = subpages.filter((detail) => detail.key === hash)[0];
      if (tempCurrent.key !== current.key) {
        setCurrent(tempCurrent);
        window.scrollTo(0, 475);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location]);

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <Banner
          maxWidth={'650px'}
          name={current.title}
          bgImage={'/support.png'}
          color={'var(--standard-white)'}
          height={'350px'}
        />

        <div className={styles.pageContainer}>
          <Container size={'large'} spacing={'min'}>
            <Contact></Contact>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
