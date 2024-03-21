import React, { useContext, useRef } from 'react';

import Container from '../components/Container';
import Hero from '../components/Hero';

import * as styles from './about.module.css';
import { LocalizationContext } from '../context/localizationContext';

const AboutPage = (props) => {
  let historyRef = useRef();
  let valuesRef = useRef();

  const { t } = useContext(LocalizationContext);

  return (
    <div className={styles.root}>
      {/* Hero Container */}
      <Hero maxWidth={'900px'} image={'/about.jpg'} title={`Elite sport`} />

      <Container size={'large'} spacing={'min'}>
        <div className={styles.detailContainer} ref={historyRef}>
          <p
            dangerouslySetInnerHTML={{ __html: t('ABOUT_PAGE.section1.title') }}
          />
        </div>
      </Container>

      <div className={styles.imageContainer}>
        <img alt={'shirt brand'} src={'/about1.png'}></img>
      </div>

      <Container size={'large'} spacing={'min'}>
        <div className={styles.content}>
          <h3>{t('ABOUT_PAGE.section2.title')}</h3>
          <div ref={valuesRef}>
            <p
              dangerouslySetInnerHTML={{
                __html: t('ABOUT_PAGE.section2.description'),
              }}
            />
            <img alt={'founder'} src={'/about2.webp'}></img>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
