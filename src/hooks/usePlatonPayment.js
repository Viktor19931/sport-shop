const usePlatonPayment = () => {
  const handlePayPlaton = async () => {
    console.log('AAA Platon ');
    const form = document.getElementById('paymentForm');
    console.log(JSON.stringify(Object.fromEntries(new FormData(form))));
    form.submit();
  };

  return handlePayPlaton;
};

export default usePlatonPayment;
