import React, { useState, useContext } from 'react';
import * as styles from './sample.module.css';

import Accordion from '../../components/Accordion';
import AdjustItem from '../../components/AdjustItem';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import CurrencyFormatter from '../../components/CurrencyFormatter';
import Gallery from '../../components/Gallery';
import SizeList from '../../components/SizeList';
import Split from '../../components/Split';
import SwatchList from '../../components/SwatchList';
import Layout from '../../components/Layout/Layout';
import products from '../../helpers/product.json';

import { generateMockProductData, getProductById } from '../../helpers/mock';
import Icon from '../../components/Icons/Icon';
import ProductCardGrid from '../../components/ProductCardGrid';
import { navigate } from 'gatsby';
import { CartContext } from '../../context/cartContext';

import AddItemNotificationContext from '../../context/cartContext';

const ProductPage = (props) => {
  const productId = +props.location.search.split('=')[1] || 1;
  const product = products.find((p) => p.id === productId);

  const { setItem } = useContext(CartContext);

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;
  const [qty, setQty] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState(product.colorOptions[0]);
  const [activeSize, setActiveSize] = useState(product.sizeOptions[0]);
  const suggestions = generateMockProductData(4, 'woman');

  const handleAddToCart = () => {
    console.log('PPP ', {
      ...product,
      quantity: qty,
      color: activeSwatch,
      size: activeSize,
    });
    setItem({
      ...product,
      quantity: qty,
      color: activeSwatch,
      size: activeSize,
    });
  };

  return (
    <Layout>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <Breadcrumbs
            crumbs={[
              { link: '/', label: 'Головна' },
              { label: 'Магазин', link: '/shop' },
              { label: `${product.name}` },
            ]}
          />
          <div className={styles.content}>
            <div className={styles.gallery}>
              <Gallery images={product.gallery} />
            </div>
            <div className={styles.details}>
              <h1>{product.name}</h1>
              <div className={styles.priceContainer}>
                ${product.price} / ₴{product.price * 40}
              </div>

              <div>
                <SwatchList
                  swatchList={product.colorOptions}
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
                <span>Quantity</span>
                <AdjustItem qty={qty} setQty={setQty} />
              </div>

              <div className={styles.actionContainer}>
                <div className={styles.addToButtonContainer}>
                  <Button
                    onClick={() => handleAddToCart()}
                    fullWidth
                    level={'primary'}
                  >
                    Додати в корзину
                  </Button>
                </div>
                <div
                  className={styles.wishlistActionContainer}
                  role={'presentation'}
                  onClick={() => setIsWishlist(!isWishlist)}
                >
                  <Icon symbol={'heart'}></Icon>
                  <div
                    className={`${styles.heartFillContainer} ${
                      isWishlist === true ? styles.show : styles.hide
                    }`}
                  >
                    <Icon symbol={'heartFill'}></Icon>
                  </div>
                </div>
              </div>

              <div className={styles.description}>
                <p dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>

              <div className={styles.informationContainer}>
                {/* <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'composition & care'}
                >
                  <p className={styles.information}>{product.description}</p>
                </Accordion> */}
                <Accordion
                  type={'plus'}
                  customStyle={styles}
                  title={'доставка і повернення'}
                >
                  <p className={styles.information}>
                    Для всіх замовлень доставка за рахунок відправника згідно
                    тарифів пошти. ТЕРМІН ДОСТАВКИ: Очікуваний термін доставки у
                    відділенні пошти становить 2-4 робочі дні. Для замовлень, що
                    оформлені в період розпродажу термін доставки може бути
                    збільшено.
                    <br />
                    <br />
                    Обмін та повернення Товар, який ви придбали на сайті Elit
                    Sport Lviv ви завжди можете обміняти або повернути, при
                    умові що товар не був у вжитку, а його оригінальна упаковка,
                    товарний вигляд та споживчі властивості (етикетки, ярлики,
                    що містять характеристики товару) збережені. У вас є 14 днів
                    від дати відправлення, щоб повернути чи обміняти товар,
                    придбаний на сайті Elit Sport Lviv
                  </p>
                </Accordion>
                {/* <Accordion type={'plus'} customStyle={styles} title={'help'}>
                  <p className={styles.information}>{product.description}</p>
                </Accordion> */}
              </div>
            </div>
          </div>
          <div className={styles.suggestionContainer}>
            <h2>You may also like</h2>
            <ProductCardGrid
              spacing
              showSlider
              height={400}
              columns={4}
              data={suggestions}
            />
          </div>
        </Container>

        {/* <div className={styles.attributeContainer}>
          <Split
            image={'/cloth.png'}
            alt={'attribute description'}
            title={'Sustainability'}
            description={
              'We design our products to look good and to be used on a daily basis. And our aim is to inspire people to live with few timeless objects made to last. This is why quality over quantity is a cornerstone of our ethos and we have no interest in trends or seasonal collections.'
            }
            ctaText={'learn more'}
            cta={() => navigate('/blog')}
            bgColor={'var(--standard-light-grey)'}
          />
        </div> */}
      </div>
    </Layout>
  );
};

export default ProductPage;
