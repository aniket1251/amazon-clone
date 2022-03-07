import React from 'react';
import"./App.css"
import Header from './header/Header';
import Home from './homePage/Home';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Checkout from './checkout/Checkout';
import SignIn from './signIn/SignIn';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import {auth} from "./firebase";
import Payment from './payment/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Orders from './orders/Orders';

function App() {
  const[{}, dispatch]= useStateValue();
  const promise = loadStripe("pk_test_51KWzX9SChXHrIRqro0RJl7plWwldJCsoa5zGtXxi5EpaQGiLBK8MRiidHhJWrzdbB7gO1unnlTvrtKKONzYhQ81y00CiFBdiRg");

  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log(authUser);

      if(authUser){
        dispatch({
          type:"SET_USER",
          user: authUser
        })
      }else{
        dispatch({
          type:"SET_USER",
          user: null
        })
      }

    })
  }, [])

  return (
    <Router>
      <div className="app">
    <Routes>
    <Route path="/" element={<>
      <Header/>
      <Home/>
    </>}/>
    <Route path="/checkout"  element={<>
      <Header/>
      <Checkout/>
    </>}/>
    <Route path="/signIn" element={<SignIn/>}/>
    <Route path="/payment" element={
      <>
        <Header/>
        <Elements stripe={promise}>
          <Payment/>
        </Elements>
      </>
    }
    />
    <Route path="/orders" element={<>
      <Header/>
      <Orders/>
    </>}/>
    </Routes>
    </div>
    </Router>
    
  );
}

export default App;
