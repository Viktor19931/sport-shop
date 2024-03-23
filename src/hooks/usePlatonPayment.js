const usePlatonPayment = () => {
  const handlePayPlaton = async () => {
    console.log('AAA Platon ');
    const form = document.getElementById('PlatonPaymentForm');
    console.log(JSON.stringify(Object.fromEntries(new FormData(form))));
    form.submit();
  };

  return handlePayPlaton;
};

export default usePlatonPayment;
