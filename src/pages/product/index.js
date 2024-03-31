import React, { useState, useContext } from 'react';
import * as styles from './product.module.css';

import Accordion from '../../components/Accordion';
import AdjustItem from '../../components/AdjustItem';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import Gallery from '../../components/Gallery';
import SizeList from '../../components/SizeList';
import SwatchList from '../../components/SwatchList';
import products from '../../helpers/product.json';

import { generateMockProductData } from '../../helpers/mock';
import ProductCardGrid from '../../components/ProductCardGrid';
import { CartContext } from '../../context/cartContext';
import getParams from '../../helpers/getParams';
import { LocalizationContext } from '../../context/localizationContext';

const ProductPage = (props) => {
  const { id } = getParams(props.location.search);
  const productId = +id || 1;
  const product = products.find((p) => p.id === productId);

  const { setItem } = useContext(CartContext);

  const [qty, setQty] = useState(1);
  const [activeSwatch, setActiveSwatch] = useState(product.colorOptions[0]);
  const [activeSize, setActiveSize] = useState(product.sizeOptions[0]);
  const suggestions = generateMockProductData(4, 'woman');

  console.log('PPP product ', product);

  const handleAddToCart = () => {
    setItem({
      ...product,
      quantity: qty,
      color: activeSwatch,
      size: activeSize,
    });
  };

  const { t } = useContext(LocalizationContext);

  return (
    <div className={styles.root}>
      <Container size={'large'} spacing={'min'}>
        <Breadcrumbs
          crumbs={[
            { link: '/', label: 'MENU.main' },
            { label: 'MENU.shop', link: '/shop' },
            { label: `${product.name}` },
          ]}
        />
        <div className={styles.content}>
          <div className={styles.gallery}>
            <Gallery images={product.gallery} />
          </div>
          <div className={styles.details}>
            <h1>{t(product.name)}</h1>
            <div className={styles.priceContainer}>
              ${product.price} / ₴{product.price * 40}
            </div>

            <div>
              <SwatchList
                swatchList={product?.colorOptions}
                activeSwatch={activeSwatch}
                setActiveSwatch={setActiveSwatch}
              />
            </div>

            <div className={styles.sizeContainer}>
              <SizeList
                sizeList={product.sizeOptions}
                activeSize={activeSize}
                setActiveSize={setActiveSize}
              />
            </div>

            <div className={styles.quantityContainer}>
              <span>{t('PRODUCT_PAGE.quantity')}</span>
              <AdjustItem qty={qty} setQty={setQty} />
            </div>

            <div className={styles.actionContainer}>
              <div className={styles.addToButtonContainer}>
                <Button
                  onClick={() => handleAddToCart()}
                  fullWidth
                  level={'primary'}
                >
                  {t('PRODUCT_PAGE.basketButton')}
                </Button>
              </div>
            </div>

            <div className={styles.description}>
              <p
                dangerouslySetInnerHTML={{
                  __html: t(product.description),
                }}
              />
            </div>

            <div className={styles.informationContainer}>
              <Accordion
                type={'plus'}
                customStyle={styles}
                title={t('PRODUCT_PAGE.shippingInfo')}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: t('PRODUCT_PAGE.shippingTerms'),
                  }}
                  className={styles.information}
                />
              </Accordion>
            </div>
          </div>
        </div>
        <div className={styles.suggestionContainer}>
          <h2>{t('PRODUCT_PAGE.similarProducts')}</h2>
          <ProductCardGrid
            spacing
            showSlider
            height={400}
            columns={4}
            data={suggestions}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
