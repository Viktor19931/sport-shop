import axios from 'axios';

const useMonoBankPayment = () => {
  const handlePayMono = async (name, amount, email) => {
    const monoData = await axios
      .post(
        'https://api.monobank.ua/api/merchant/invoice/create',
        {
          amount: amount * 100,
          ccy: 840,
          redirectUrl: 'https://amanita-store.com/orderConfirm',
          merchantPaymInfo: {
            customerEmails: [], // Масив пошт, на які потрібно відправити фіскальний чек, якщо у мерчанта активна звʼязка з checkbox
            destination: `Покупка речей, ${name} (${email})`,
            basketOrder: [],
          },
        },
        {
          headers: {
            'X-Token': process.env.GATSBY_MONO_TOKEN,
          },
        }
      )
      .catch((e) => console.log('MMM error', e));

    if (monoData) window.location.href = monoData.data.pageUrl;
    // window.open(monoData?.data.pageUrl);
  };

  return handlePayMono;
};

export default useMonoBankPayment;
