import React, { useState, useEffect } from 'react';
import * as styles from './shop.module.css';

import Breadcrumbs from '../components/Breadcrumbs';
import CardController from '../components/CardController';
import Container from '../components/Container';
import Layout from '../components/Layout';
// import LayoutOption from '../components/LayoutOption';
import ProductCardGrid from '../components/ProductCardGrid';
import { getAllProducts } from '../helpers/mock';
import Config from '../config.json';
import getParams from '../helpers/getParams';

const ShopPage = (props) => {
  const { gender } = getParams(props.location.search);
  const [showFilter, setShowFilter] = useState(false);
  const allProducts = getAllProducts();

  const data = gender
    ? getAllProducts().filter((p) => p.tags.includes(gender))
    : allProducts;

  useEffect(() => {
    window.addEventListener('keydown', escapeHandler);
    return () => window.removeEventListener('keydown', escapeHandler);
  }, []);

  const escapeHandler = (e) => {
    if (e?.keyCode === undefined) return;
    if (e.keyCode === 27) setShowFilter(false);
  };

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs
              crumbs={[
                { link: '/', label: 'Головна' },
                { label: 'Магазин', link: '/shop' },
              ]}
            />
          </div>
        </Container>
        {/* <Banner
          maxWidth={'650px'}
          name={`Жіночі светри`}
          subtitle="Подивіться на наші жіночі светри, щоб отримати сучасні погляди на одноразовий одяг. Від міді зі сміливими принтами до драматичних стилів для підмітання підлоги та легких моноблоків — наша редакція охоплює будь-який настрій."
        /> */}
        <Container size={'large'} spacing={'min'}>
          {/* <div className={styles.metaContainer}> */}
          {/* <div className={styles.controllerContainer}>
              <div
                className={styles.iconContainer}
                role={'presentation'}
                onClick={() => setShowFilter(!showFilter)}
              >
                <Icon symbol={'filter'} />
                <span>Фільтри</span>
              </div>
              <div
                className={`${styles.iconContainer} ${styles.sortContainer}`}
              >
                <span>Сортувати</span>
                <Icon symbol={'caret'} />
              </div>
            </div> */}
          {/* </div> */}
          <CardController
            closeFilter={() => setShowFilter(false)}
            visible={showFilter}
            filters={Config.filters}
          />
          {/* <div className={styles.chipsContainer}>
            <Chip name={'XS'} />
            <Chip name={'S'} />
          </div> */}
          <div className={styles.productContainer}>
            <ProductCardGrid data={data.reverse()} />
          </div>
          {/* <div className={styles.loadMoreContainer}>
            <span>6 of 456</span>
            <Button fullWidth level={'secondary'}>
              LOAD MORE
            </Button>
          </div> */}
        </Container>
      </div>

      {/* <LayoutOption /> */}
    </Layout>
  );
};

export default ShopPage;
