const usePlatonPayment = () => {
  console.log('AAA Platon ');

  const handlePayPlaton = async () => {
    const form = document.getElementById('paymentForm');
    console.log(Object.fromEntries(new FormData(form)));
    form.submit();
  };

  return handlePayPlaton;
};

export default usePlatonPayment;
