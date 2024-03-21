import * as React from 'react';

import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Hero from '../components/Hero';
import Highlight from '../components/Highlight';
import Layout from '../components/Layout/Layout';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import ProductCardGrid from '../components/ProductCardGrid';
import Quote from '../components/Quote';
import Title from '../components/Title';

import { getAllProducts } from '../helpers/mock';

import * as styles from './index.module.css';
import { Link, navigate } from 'gatsby';
import { LocalizationContext } from '../context/localizationContext';

const IndexPage = () => {
  const allProducts = getAllProducts();

  const newArrivals = allProducts.slice(-3);
  const bestSellers = allProducts.filter((p) => [5, 6, 9, 15].includes(p.id));

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <div>
      {/* Hero Container */}
      <Hero
        maxWidth={'500px'}
        image={'/walk.jpeg'}
        title={'MAIN_PAGE.section1.title'}
        ctaText={'MAIN_PAGE.section1.button'}
        ctaAction={goToShop}
      />

      {/* Collection Container */}
      <div className={styles.collectionContainer}>
        <Container size={'large'}>
          <Title name={'MAIN_PAGE.section2.title'} />
          <ProductCollectionGrid />
        </Container>
      </div>

      {/* New Arrivals */}
      <div className={styles.newArrivalsContainer}>
        <Container>
          <Title
            name={'MAIN_PAGE.section3.title'}
            link={'/shop'}
            textLink={'MAIN_PAGE.section3.seeAll'}
          />
          <ProductCardGrid
            spacing={true}
            showSlider={false}
            height={480}
            columns={3}
            data={newArrivals}
          />
        </Container>
      </div>

      {/* Highlight  */}
      <div className={styles.highlightContainer}>
        <Container size={'large'} fullMobile>
          <Highlight
            image={'/products/product1/1.jpeg'}
            altImage={'куртка'}
            miniImage={'/products/product1/4.jpeg'}
            miniImageAlt={'mini highlight image'}
            title="MAIN_PAGE.section4.title"
            description={`MAIN_PAGE.section4.description`}
            textLink={'MAIN_PAGE.section4.button'}
            link={'/product/sample?id=1'}
          />
        </Container>
      </div>

      {/* Quote */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={''}
        quote="MAIN_PAGE.section5.text"
      />

      {/* Promotion */}
      <div className={styles.promotionContainer}>
        <Hero
          image={'/board.jpeg'}
          title="MAIN_PAGE.section6.title"
          subtitle="MAIN_PAGE.section6.subTitle"
        />
        <LocalizationContext.Consumer>
          {({ t }) => (
            <div className={styles.linkContainers}>
              <Link to={'/shop'}>{t('MAIN_PAGE.section6.button')}</Link>
            </div>
          )}
        </LocalizationContext.Consumer>
      </div>

      {/* Blog Grid */}
      {/* <div className={styles.blogsContainer}>
        <Container size={'large'}>
          <Title name={'Журнал'} subtitle={'Нотатки про життя та стиль'} />
          <BlogPreviewGrid data={blogData} />
        </Container>
      </div> */}

      {/* Promotion */}
      {/* <div className={styles.sustainableContainer}>
        <Hero
          image={'/banner3.png'}
          title={'Ми стійкі'}
          subtitle={
            'Від турботи про нашу землю до підтримки наших людей – дізнайтеся про кроки, які ми робимо, щоб зробити більше для світу навколо нас.'
          }
          ctaText={'читати далі'}
          maxWidth={'660px'}
          ctaStyle={styles.ctaCustomButton}
        />
      </div> */}

      {/* Social Media */}
      <div className={styles.socialContainer}>
        <Title
          name="MAIN_PAGE.section7.title"
          subtitle="MAIN_PAGE.section7.subTitle"
        />
        <div className={styles.socialContentGrid}>
          {bestSellers.map((p) => (
            <img key={p.id} src={p.gallery[0]} alt={p.name} />
          ))}
        </div>
      </div>
      <AttributeGrid />
    </div>
  );
};

export default IndexPage;
