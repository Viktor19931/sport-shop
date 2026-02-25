import axios from 'axios';
import { useContext } from 'react';

import { ToastContext } from '../context/toastContext';

const useMonoBankPayment = () => {
  const { showToast } = useContext(ToastContext);

  const handlePayMono = async (name, email, amount) => {
    const monoData = await axios
      .post(
        'https://api.monobank.ua/api/merchant/invoice/create',
        {
          amount: amount * 100,
          ccy: 840,
          redirectUrl: `https://elite-sport.netlify.app/orderConfirm?name=${name}&amount=${amount}`,
          merchantPaymInfo: {
            customerEmails: [],
            destination: `Оплата за товар, ${name}`,
            basketOrder: [],
          },
        },
        {
          headers: {
            'X-Token': 'm5s0kEPoyNYzoqL1aDISeSw',
          },
        }
      )
      .catch((e) => {
        console.log('MMM error MONO ', e);
        showToast('Payment request failed. Please try again later.', 'error');
      });

    if (monoData && monoData.data?.pageUrl) {
      window.location.href = monoData.data.pageUrl;
    } else {
      showToast('Payment request failed. Please try again later.', 'error');
    }
  };

  return handlePayMono;
};

export default useMonoBankPayment;
