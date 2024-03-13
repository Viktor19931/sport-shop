import useMonoBankPayment from './useMonoBankPayment';
import useVostokPayment from './useVostokPayment';

const useBankPayment = () => {
  const handlePayVostok = useVostokPayment();
  const handlePayMono = useMonoBankPayment();

  const mapper = {
    MONO: handlePayMono,
    VOSTOK: handlePayVostok,
  };

  return mapper[process.env.GATSBY_PAYMENT_SYSTEM!];
};

export default useBankPayment;
