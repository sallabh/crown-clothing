import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe  = price * 100 ;
	const publishableKey = 'pk_test_1IMUw79NaQrEnBMwQc1qwmpU00myNWR6lF';
	
	const onToken = token => {
		console.log(token);
		alert('Payment Successful');
	}
	
	
	return(
		<StripeCheckout
			label='Pay Now'
			name='CROWN Clothing Ltd.'
			billingAddress
			shippingAddress
			image='http://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	)
}

export default StripeCheckoutButton;
