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

function App() {
  const[{}, dispatch]= useStateValue();

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
    </Routes>
    </div>
    </Router>
    
  );
}

export default App;
