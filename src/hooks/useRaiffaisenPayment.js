const usePlatonPayment = () => {
  const handlePayPlaton = async () => {
    console.log('AAA Raiffaisen ');
    const form = document.getElementById('RaiffaisenPaymentForm');
    console.log(JSON.stringify(Object.fromEntries(new FormData(form))));
    // form.submit();
  };

  return handlePayPlaton;
};

export default usePlatonPayment;
