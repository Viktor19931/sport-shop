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
              Elit Sport є інноваційним магазином. Ми створюємо позачасовий
              повсякденний одяг класу люкс.
            </p>
            <br />
            <br />
            <p>
              Ми створили одні з перших у світі футболок і витратили на це
              десятиліття покращуючи відчуття бавовни. Сьогодні ми єдиний бренд
              яка виготовляє футболки на власній фабриці у Великобританії. І ми
              це робимо на тій самій фабриці, яку ми займаємо з 1937 року.
            </p>
          </div>
        </Container>

        <div className={styles.imageContainer}>
          <img alt={'shirt brand'} src={'/about1.png'}></img>
        </div>

        <Container size={'large'} spacing={'min'}>
          <div className={styles.content}>
            <h3>Наші цінності</h3>
            <div ref={valuesRef}>
              <p>
                Компанія Elite Sport випустила одні з найперших у світі
                футболок. В наприкінці 1800-х років компанія виготовляла
                розкішні туніки та нижні сорочки легка бавовна Sea Island для
                експорту на Далекий Схід і інші теплі клімати. Хоча цей одяг
                спочатку мав шовк планки на ґудзиках, їх було видалено на
                початку 1900-х років замінено простими зв'язаними горловинами
                для зменшення витрат на виробництво - створення футболки. Ми
                поставили світ як футболку еволюціонував від нижньої білизни до
                верхнього одягу, від символу молодості повстання до
                повсякденного гардеробу, і ми витратили десятиліття
                вдосконалюючи кожен його аспект.
              </p>
              <ol>
                <li>Будьте ecowear</li>
                <li>Складний і не масовий</li>
                <li>Тільки натуральні матеріали</li>
              </ol>
              <img alt={'founder'} src={'/about2.png'}></img>
            </div>
            <h3>Стабільність</h3>
            <div id={'#sustainability'} ref={sustainabilityRef}>
              <p>
                Наш засновник, Томас Хілл, мав як око на якість, так і прагнення
                до інновацій. А також з використанням найтонших волокон, таких
                як Бавовна, кашемір і шовк Сі-Айленд він винайшов власний
                тканини. Sunspel продовжує цю відданість інноваціям і сьогодні і
                наші унікальні тканини включають: Q100 Sea Island cotton, Q82
                Бавовна Supima, бавовна з основотрикотажної сітки Q75 і
                основотрикотаж Q14 сотовий бавовна. Технологія, що лежить в
                основі цих тканин, залишається незмінна сьогодні, і всі продукти
                Sunspel використовують найкращу бавовну, шерсть і волокна.
              </p>
              <p>
                Зроблено в Лонг-Ітоні, Англія, і виготовлено з нашого розкішного
                довгого одягу штапельна бавовна Supima для неперевершеної
                м'якості, комфорту та довговічність, футболка Sunspel має
                класичний крій і тільки найважливіші деталі.{' '}
              </p>
              <p>
                Понад 100 років вдосконалюючи тканину, форму та стиль, Футболка
                Sunspel Classic визнана найкращою в світі світ.
              </p>
            </div>
          </div>
        </Container>

        <div className={styles.imageContainer}>
          <img alt={'shirt backwards'} src={'/about3.png'}></img>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
