import React, { useContext, useEffect } from 'react';
import * as styles from './accountSuccess.module.css';

import ActionCard from '../components/ActionCard';
import Container from '../components/Container';
import getParams from '../helpers/getParams';
import sendDataToBot from '../helpers/sendDataToBot';
import { LocalizationContext } from '../context/localizationContext';

const OrderConfirmPage = ({ location }) => {
  const { name, amount } = getParams(location.search);
  const { t } = useContext(LocalizationContext);

  useEffect(() => {
    const text = `
    магазин одягу
    успішна оплата

    name: ${name}
    amount: ${amount}
    `;
    localStorage.clear();
    name && sendDataToBot(text);
  }, []);

  return (
    <Container size={'medium'}>
      <div className={styles.root}>
        <h1>
          {t('SUCCESS_PAGE.ThankYou')} {name || ''}!
        </h1>
        <p>{t('SUCCESS_PAGE.description')}</p>
        <div className={styles.actionContainer}>
          <ActionCard
            link={'/shop'}
            icon={'bag'}
            title="SUCCESS_PAGE.btn1.title"
            subtitle="SUCCESS_PAGE.btn1.subTitle"
          />
          <ActionCard
            icon={'question'}
            link={'/shipping'}
            title="SUCCESS_PAGE.btn2.title"
            subtitle="SUCCESS_PAGE.btn2.subTitle"
          />
          <ActionCard
            icon={'phone'}
            link={'/contact-us'}
            title="SUCCESS_PAGE.btn3.title"
            subtitle="SUCCESS_PAGE.btn3.subTitle"
          />
        </div>
      </div>
    </Container>
  );
};

export default OrderConfirmPage;
