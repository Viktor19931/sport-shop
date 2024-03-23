import useMonoBankPayment from './useMonoBankPayment';
import useVostokPayment from './useVostokPayment';
import usePlatonPayment from './usePlatonPayment';
import useRaiffeisenPayment from './useRaiffeisenPayment';

const useBankPayment = () => {
  const handlePayVostok = useVostokPayment();
  const handlePayMono = useMonoBankPayment();
  const handlePayPlaton = usePlatonPayment();
  const handlePayRaiffeisen = useRaiffeisenPayment();

  const mapper = {
    MONO: handlePayMono,
    VOSTOK: handlePayVostok,
    PLATON: handlePayPlaton,
    RAIFFEISEN: handlePayRaiffeisen,
  };

  return mapper[process.env.GATSBY_PAYMENT_SYSTEM];
};

export default useBankPayment;
