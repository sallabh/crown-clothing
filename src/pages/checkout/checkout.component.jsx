import React from 'react';
import './checkout.styles.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { selectCartItems , selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckOutItem from '../../component/checkout-item/checkout-item.component';

import StripeCheckoutButton from '../../component/stripe-button/stripe-button.component'

const CheckOutPage = ({cartItems,total}) => (
	
	<div className="checkout-page">
		<div className="checkout-header">
			<div className="header-block">
				<span>Product</span>
			</div>
			<div className="header-block">
				<span>Description</span>
			</div>
			<div className="header-block">
				<span>Quantity</span>
			</div>
			<div className="header-block">
				<span>Price</span>
			</div>
			<div className="header-block">
				<span>Remove</span>
			</div>
		</div>
		{
			cartItems.map(cartItem => (
			<CheckOutItem key={cartItem.id} cartItem={cartItem}/>
				
			))}
		<div className="total">TOTAL: ${total}</div>
		<div className='test-warning'>
			*Please use the following Test Credit Card for payment*
			<br />
			4242 4242 4242 4242 -Exp: 01/20 - CVV: 123
		</div>
			
			<StripeCheckoutButton price={total}/>
		</div>
	
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal
});

export default connect(mapStateToProps)(CheckOutPage);