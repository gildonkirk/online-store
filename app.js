addToCart();

function addToCart() {
  $(document).on('click', '.listItem', function() {
    const newItem = $(event.target);
    console.log(newItem.parent().children('p').text());
    let newItemPrice = newItem.parent().children('p').text();
    newItemPrice = newItemPrice.replace('$', '');
    console.log(newItemPrice);
    $('.chosenItems').append($(this));
    $(this).addClass('cartItem');

    paypal.Button.render({
      // Configure environment
      env: 'sandbox',
      client: {
        sandbox: 'AevBNj4gVlvmDY-Sb0FjIYiP2xd3tuJURLLlXfNeIfP1BNmH7G26TSQwMPBZp_uhuipLNcUBDs_RMp7R',
        production: 'demo_production_client_id'
      },
      // Customize button (optional)
      locale: 'en_US',
      style: {
        size: 'small',
        color: 'gold',
        shape: 'pill',
      },

      // Enable Pay Now checkout flow (optional)
      commit: true,

      // Set up a payment
      payment: function(data, actions) {
        console.log(actions.payment);
        return actions.payment.create({
          transactions: [{
            amount: {
              total: newItemPrice,
              currency: 'USD'
            }
          }]
        }).then(function(response) {
          console.log(response);
          return response; //Pay ID
        });
      },
      // Execute the payment
      onAuthorize: function(data, actions) {
        console.log(data);
        console.log(actions);
        return actions.payment.execute().then(function() {
          // Show a confirmation message to the buyer
          window.alert('Thank you for your purchase!');
        });
      }
    }, '#paypal-button');

  });
};
