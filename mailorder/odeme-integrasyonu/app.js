// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stripe = require('stripe')('pk_test_51OIZ57EPYrKkyYkaUusXTam81yFGylaVbAxqbDbvgf5t0ijes45CEA3E4WBjWgqa67wWpctfMyO6XRCJ768Io8Oh00k2WyhH4K');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/process-payment', async (req, res) => {
  const { amount, stripeToken, description } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      description: description,
      source: stripeToken,
    });

    // Ödeme başarılı ise başarıyı döndür
    res.status(200).json({ success: true, charge });
  } catch (err) {
    console.error(err);
    // Ödeme başarısız ise hatayı döndür
    res.status(500).json({ error: 'Ödeme işlemi başarısız.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
