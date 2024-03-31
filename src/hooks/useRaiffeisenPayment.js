const useRaiffeisenPayment = () => {
  const handlePayRaiffeisen = async () => {
    console.log('AAA Raiffaisen ');

    const form = document.getElementById('RaiffaisenPaymentForm');
    console.log(
      'AAA 2 ',
      JSON.stringify(Object.fromEntries(new FormData(form)))
    );
    form.submit();
  };

  return handlePayRaiffeisen;
};

export default useRaiffeisenPayment;
