import useMonoBankPayment from './useMonoBankPayment';
import useVostokPayment from './useVostokPayment';
import usePlatonPayment from './usePlatonPayment';
import useRaiffeisenPayment from './useRaiffeisenPayment';
import useCryptoPayment from './useCryptoPayment';

const useBankPayment = () => {
  const handlePayVostok = useVostokPayment();
  const handlePayMono = useMonoBankPayment();
  const handlePayPlaton = usePlatonPayment();
  const handlePayRaiffeisen = useRaiffeisenPayment();
  const handlePayCrypto = useCryptoPayment();

  const mapper = {
    MONO: handlePayMono,
    VOSTOK: handlePayVostok,
    PLATON: handlePayPlaton,
    RAIFFEISEN: handlePayRaiffeisen,
    CRYPTO: handlePayCrypto,
  };

  return mapper[process.env.GATSBY_PAYMENT_SYSTEM];
};

export default useBankPayment;
