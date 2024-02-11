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

import { generateMockBlogData, generateMockProductData } from '../helpers/mock';

import * as styles from './index.module.css';
import { Link, navigate } from 'gatsby';

const IndexPage = () => {
  const newArrivals = generateMockProductData(3, 'shirt');
  const blogData = generateMockBlogData(3);

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'500px'}
        image={'/banner1.png'}
        title={'Основні речі для холодної зими'}
        subtitle={'Відкрийте для себе осінь-зима 2023'}
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
            image={'/highlight.png'}
            altImage={'highlight image'}
            miniImage={'/highlightmin.png'}
            miniImageAlt={'mini highlight image'}
            title={'Розкішний трикотаж'}
            description={`Цей м’який джемпер з овечої вовни пов’язаний у Шотландії з використанням пряжі однієї з найстаріших у світі прядильних фабрик у Файфі`}
            textLink={'купити'}
            link={'/shop'}
          />
        </Container>
      </div>

      {/* Promotion */}
      <div className={styles.promotionContainer}>
        <Hero image={'/banner2.png'} title={`-50% Знижка`} />
        <div className={styles.linkContainers}>
          <Link to={'/shop'}>Жінкам</Link>
          <Link to={'/shop'}>Чоловікам</Link>
        </div>
      </div>

      {/* Quote */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={''}
        quote={
          '“Ми віримо в дві речі: прагнення до якості в усьому, що ми робимо, і турбота один про одного. Все інше має подбати про себе.”'
        }
      />

      {/* Blog Grid */}
      <div className={styles.blogsContainer}>
        <Container size={'large'}>
          <Title name={'Журнал'} subtitle={'Нотатки про життя та стиль'} />
          <BlogPreviewGrid data={blogData} />
        </Container>
      </div>

      {/* Promotion */}
      <div className={styles.sustainableContainer}>
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
      </div>

      {/* Social Media */}
      <div className={styles.socialContainer}>
        <Title
          name={'Стилізовано вами'}
          subtitle={'Tag @elite_sport to be featured.'}
        />
        <div className={styles.socialContentGrid}>
          <img src={`/social/socialMedia1.png`} alt={'social media 1'} />
          <img src={`/social/socialMedia2.png`} alt={'social media 2'} />
          <img src={`/social/socialMedia3.png`} alt={'social media 3'} />
          <img src={`/social/socialMedia4.png`} alt={'social media 4'} />
        </div>
      </div>
      <AttributeGrid />
    </Layout>
  );
};

export default IndexPage;
