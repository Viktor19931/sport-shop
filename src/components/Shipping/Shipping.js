import React, { useState } from 'react';
import Button from '../Button';

import FormInputField from '../FormInputField/FormInputField';

import * as styles from './Shipping.module.css';

const Shipping = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <h4>
          Для всіх замовлень доставка за рахунок Відправника згідно тарифів
          пошти.
        </h4>
        <p>
          ТЕРМІН ДОСТАВКИ:  Очікуваний термін доставки у відділенні пошти
          становить 2-4 робочі дні по Україні , за кордон 14-50 робочі дні. Для
          замовлень, що оформлені в період розпродажу термін доставки може бути
          збільшено.
        </p>
      </div>

      <div className={styles.section}>
        <h4>Обмін та повернення</h4>
        <p>
          Товар, який Ви придбали на сайті ELITE SPORT Ви завжди можете обміняти
          або повернути, при умові ,що товар не був у вжитку, а його оригінальна
          упаковка, товарний вигляд та споживчі властивості (етикетки, ярлики,
          що містять характеристики товару) збережені.  У вас є 14 днів від дати
          відправлення, щоб повернути чи обміняти товар, придбаний на сайті
          ELITE SPORT
        </p>
      </div>
    </div>
  );
};

export default Shipping;
