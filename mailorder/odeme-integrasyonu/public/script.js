// script.js

var stripe = Stripe('pk_test_51OIZ57EPYrKkyYkaUusXTam81yFGylaVbAxqbDbvgf5t0ijes45CEA3E4WBjWgqa67wWpctfMyO6XRCJ768Io8Oh00k2WyhH4K');
var elements = stripe.elements();

var cardNumberElement = elements.create('cardNumber');
cardNumberElement.mount('#cardNumber');

var cardExpiryElement = elements.create('cardExpiry');
cardExpiryElement.mount('#expiryDate');

var cardCvcElement = elements.create('cardCvc');
cardCvcElement.mount('#cvv');

var cardHolderNameInput = document.getElementById('cardHolderName');
var amountInput = document.getElementById('amount');
var submitButton = document.getElementById('submit');

// Ödeme butonuna tıklandığında
submitButton.addEventListener('click', function() {
  stripe.createToken(cardNumberElement, {
    name: cardHolderNameInput.value,
  }).then(function(result) {
    if (result.error) {
      // Hata durumunda kullanıcıya bildir
      alert('Ödeme başarısız. Hata: ' + result.error.message);
    } else {
      // Ödeme başarılı ise
      alert('Ödeme başarılı! Ödenecek Miktar: ' + amountInput.value + ' TL');
      // result.token'i sunucuya göndererek işlemi tamamlayabilirsin
    }
  });
});
