import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import './App.css';
import Header from './component/header/header.component.jsx'



function App() {
  return (
    <div>
		  <Header />
		  <Switch>
			  	<Route exact path="/" component={HomePage}/>
		  		<Route exact path="/shop" component={ShopPage}/>
		  </Switch>
		  
    </div>
  );
}

export default App;
