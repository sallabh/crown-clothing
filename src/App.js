import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import './App.css';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './component/header/header.component.jsx';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';

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
		  		<Route exact path="/shop" component={ShopPage}/>
			  <Route exact path="/signin" component={SignInAndSignUpPage}/>
			  
		  </Switch>
		  
    </div>
	);
	}
}

const mapDispatchToProps = dispatch => ({
	
	setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null,mapDispatchToProps)(App);
