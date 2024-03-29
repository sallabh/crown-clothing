import React from 'react';
import { Route, Switch , Redirect} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/checkout/checkout.component';

import './App.css';

import Header from './component/header/header.component.jsx';

import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import {selectCurrentUser} from './redux/user/user.selectors';



class App extends React.Component {
		
	unsubscribeFromAuth = null;
	
	componentDidMount(){
		const {setCurrentUser} = this.props;
		
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
		 if(userAuth) {
			 const userRef = await createUserProfileDocument(userAuth);
			 
			 
			 userRef.onSnapshot(snapShot => {
				 setCurrentUser({
						 id: snapShot.id,
						 ...snapShot.data()
					 });
				 });
			 };
			setCurrentUser(userAuth);
		 });
	}
	componentWillUnmount(){
		this.unsubscribeFromAuth();
	}
	render() {
		return (
    <div>
		  <Header />
		  <Switch>
			  	<Route exact path="/" component={HomePage}/>
		  		<Route  path="/shop" component={ShopPage}/>
			  	<Route exact path="/checkout" component={CheckOutPage}/>

			  <Route exact path="/signin" 
				  render={() => this.props.currentUser ? 
				  (<Redirect to='/'/>) : 
				  (<SignInAndSignUpPage/>)}
				  />
		  </Switch>
		  
    </div>
	);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
	
	setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
