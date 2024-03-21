import React, { useRef } from 'react';

import Container from '../components/Container';
import Hero from '../components/Hero';
import ThemeLink from '../components/ThemeLink';
import Layout from '../components/Layout/Layout';

import * as styles from './about.module.css';
const AboutPage = (props) => {
  let historyRef = useRef();
  let valuesRef = useRef();

  const handleScroll = (elementReference) => {
    if (elementReference) {
      window.scrollTo({
        behavior: 'smooth',
        top: elementReference.current.offsetTop - 280,
      });
    }
  };

  return (
    <div className={styles.root}>
      {/* Hero Container */}
      <Hero maxWidth={'900px'} image={'/about.jpg'} title={`Elite sport`} />

      <Container size={'large'} spacing={'min'}>
        <div className={styles.detailContainer} ref={historyRef}>
          <p>
            ELITE SPORT - це інтернет магазин спортивних товарів для активного
            відпочинку. Тут Ви можете замовити будь який одяг , аксесуари для
            відпочинку на лижах, сноуборді, велосипеді, спортзалі та ін.
          </p>
          <br />
          <br />
          <p>
            У каталозі Ви знайдете якісний і стильний, зручний і надійний
            спортивний одяг на будь-який смак.
          </p>
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
              Якісний спортивний одяг - запорука комфортного фітнесу та
              відпочинку.
            </p>
            <p>
              Однією з важливих складових незабутнього активного відпочинку на
              гірськолижному курорті, є правильно підібране гірськолижне вбрання
              яке захистить Вас від несприятливих погодних умов. Разом із
              магазином ELITE SPORT на схилах ви будете завжди виглядати стильно
              та впевнено в собі . У спортзалі чи при їзді на велосипеді Ви
              почуватимете себе комфортно під час тренувань.
            </p>
            <p>ELITE SPORT - це якість і доступність найкращого одягу.</p>
            <p>Бажаємо приємного шопінгу!</p>
            <img alt={'founder'} src={'/about2.webp'}></img>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
