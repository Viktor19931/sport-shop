import * as React from 'react';

import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Hero from '../components/Hero';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import Highlight from '../components/Highlight';
import Layout from '../components/Layout/Layout';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import ProductCardGrid from '../components/ProductCardGrid';
import Quote from '../components/Quote';
import Title from '../components/Title';

import {
  generateMockBlogData,
  generateMockProductData,
  getAllProducts,
} from '../helpers/mock';

import * as styles from './index.module.css';
import { Link, navigate } from 'gatsby';

const IndexPage = () => {
  const allProducts = getAllProducts();
  const blogData = generateMockBlogData(3);

  const newArrivals = allProducts.slice(-3);
  const bestSellers = allProducts.filter((p) => [5, 6, 9, 15].includes(p.id));

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'500px'}
        image={'/walk.jpeg'}
        title={'Основні речі для активного відпочинку'}
        ctaText={'Магазин'}
        ctaAction={goToShop}
      />

      {/* Collection Container */}
      <div className={styles.collectionContainer}>
        <Container size={'large'}>
          <Title name={'Нова колекія'} />
          <ProductCollectionGrid />
        </Container>
      </div>

      {/* New Arrivals */}
      <div className={styles.newArrivalsContainer}>
        <Container>
          <Title
            name={'Нові надходження'}
            link={'/shop'}
            textLink={'подивитись все'}
          />
          <ProductCardGrid
            spacing={true}
            showSlider
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
            title={'Водотривка куртка'}
            description={`Ця лижна куртка Nevica Banff має чотиристоронню еластичну тканину для комфортної посадки, водонепроникні блискавки спереду та кишені. Стрейч-підкладка з внутрішньої сторони робить носіння куртки приємнішим і дозволяє їй розтягуватися. Образ доповнює назва бренду на грудях і кольорова блискавка, щоб виділятися на схилах.`}
            textLink={'купити'}
            link={'/product/sample?id=1'}
          />
        </Container>
      </div>

      {/* Quote */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={''}
        quote={
          '“Ми віримо в дві речі: прагнення до якості в усьому, що ми робимо, і турбота один про одного. Все інше має подбати про себе.”'
        }
      />

      {/* Promotion */}
      <div className={styles.promotionContainer}>
        <Hero
          image={'/board.jpeg'}
          title={`Знижка до 30%`}
          subtitle={'для оптових клієнтів'}
        />
        <div className={styles.linkContainers}>
          <Link to={'/shop'}>Купити</Link>
        </div>
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
          name={'Hайкращі товари'}
          subtitle={'Тегни @elite_sport__lviv щоб бути особливим.'}
        />
        <div className={styles.socialContentGrid}>
          {bestSellers.map((p) => (
            <img key={p.id} src={p.gallery[0]} alt={p.name} />
          ))}
        </div>
      </div>
      <AttributeGrid />
    </Layout>
  );
};

export default IndexPage;
