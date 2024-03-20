import React, { useEffect } from 'react';
import * as styles from './contact-us.module.css';

import Banner from '../components/Banner';
import Contact from '../components/Contact';
import Container from '../components/Container';

const ContactPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <Banner
        maxWidth={'650px'}
        name={"ЗВ'ЯЗАТИСЯ З НАМИ"}
        bgImage={'/support.png'}
        color={'var(--standard-white)'}
        height={'350px'}
      />

      <div className={styles.pageContainer}>
        <Container size={'large'} spacing={'min'}>
          <Contact />
        </Container>
      </div>
    </div>
  );
};

export default ContactPage;
