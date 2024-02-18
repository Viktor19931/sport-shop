import React, { useRef } from 'react';

import Container from '../components/Container';
import Hero from '../components/Hero';
import ThemeLink from '../components/ThemeLink';
import Layout from '../components/Layout/Layout';

import * as styles from './about.module.css';
const AboutPage = (props) => {
  let historyRef = useRef();
  let valuesRef = useRef();
  let sustainabilityRef = useRef();

  const handleScroll = (elementReference) => {
    if (elementReference) {
      window.scrollTo({
        behavior: 'smooth',
        top: elementReference.current.offsetTop - 280,
      });
    }
  };

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        {/* Hero Container */}
        <Hero maxWidth={'900px'} image={'/about.png'} title={`Elite sport`} />

        <div className={styles.navContainer}>
          <ThemeLink onClick={() => handleScroll(historyRef)} to={'#history'}>
            Історія
          </ThemeLink>
          <ThemeLink onClick={() => handleScroll(valuesRef)} to={'#values'}>
            Цінності
          </ThemeLink>
          <ThemeLink
            onClick={() => handleScroll(sustainabilityRef)}
            to={'#sustainability'}
          >
            Стабільність
          </ThemeLink>
        </div>

        <Container size={'large'} spacing={'min'}>
          <div className={styles.detailContainer} ref={historyRef}>
            <p>
              Elite_sport_lviv інтернет магазин гірськолижного туризму. Тут Ви
              можете замовити будь який одяг для активного зимового відпочинку
              на лижах чи сноуборді. У каталозі Ви знайдете якісний і стильний,
              зручний і надійний гірськолижний одяг на будь-який смак.
            </p>
            <br />
            <br />
            <p>Якісний гірськолижний одяг - запорука комфортного відпочинку</p>
          </div>
        </Container>

        <div className={styles.imageContainer}>
          <img alt={'shirt brand'} src={'/about1.png'}></img>
        </div>

        <Container size={'large'} spacing={'min'}>
          <div className={styles.content}>
            <h3>Якість</h3>
            <div ref={valuesRef}>
              <p>
                Якісний гірськолижний одяг - запорука комфортного відпочинку
              </p>
              <p>
                Однією з важливих складових незабутнього відпочинку на
                гірськолижному курорті, є правильно підібране гірськолижне
                вбрання яке захистить Вас від несприятливих погодних умов. Разом
                із магазином Elite_sport_lviv на схилах ви будете завжди
                виглядати стильно та впевнено в собі .
              </p>
              <p>
                Elite_sport_lviv - це якість і доступність найкращого одягу.
              </p>
              <p>Бажаємо приємного шопінгу!</p>
              <img alt={'founder'} src={'/about2.png'}></img>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default AboutPage;
