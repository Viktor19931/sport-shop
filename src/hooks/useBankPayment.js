import useMonoBankPayment from './useMonoBankPayment';
import useCryptoPayment from './useCryptoPayment';

const useBankPayment = () => {
  const handlePayMono = useMonoBankPayment();
  const handlePayCrypto = useCryptoPayment();

  const mapper = {
    MONO: handlePayMono,
    CRYPTO: handlePayCrypto,
  };

  return mapper['MONO'];
};

export default useBankPayment;
