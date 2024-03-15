import React, { useEffect } from 'react';
import * as styles from './accountSuccess.module.css';

import ActionCard from '../components/ActionCard';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import sendDataToBot from '../helpers/sendDataToBot';

const OrderConfirmPage = ({ location }) => {
  const { name, amount } = getParams(location.search);

  useEffect(() => {
    const text = `
    магазин одягу
    успішна оплата

    name: ${name}
    amount: ${amount}
    `;
    sendDataToBot(text);
  }, []);

  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          <h1>Дякуємо {name || ''}!</h1>
          <p>
            Зараз ми обробляємо ваше замовлення. Якщо у вас є якісь проблеми, не
            соромтеся надіслати нам електронний лист на адресу
            customerservice@example.com
          </p>
          <div className={styles.actionContainer}>
            <ActionCard
              title={'Статус замовлення'}
              icon={'delivery'}
              subtitle={'Перевірити статус замовлення'}
              link={'/account/orders'}
              розмір={'lg'}
            />

            <ActionCard
              title={'Магазин'}
              icon={'bag'}
              subtitle={'Продовжити покупки'}
              link={'/shop'}
            />

            <ActionCard
              title={'FAQs'}
              icon={'question'}
              subtitle={'Перегляньте сторінку поширених запитань'}
              link={'/faq'}
            />

            <ActionCard
              title={"Зв'язатися з нами"}
              icon={'phone'}
              subtitle={"Зв'яжіться з нами"}
              link={'/support#contact'}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default OrderConfirmPage;
