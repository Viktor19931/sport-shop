import useMonoBankPayment from './useMonoBankPayment';

const useBankPayment = () => {
  const handlePayMono = useMonoBankPayment();

  return handlePayMono;
};

export default useBankPayment;
