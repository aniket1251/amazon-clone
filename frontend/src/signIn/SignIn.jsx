import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase.js"

import "./SignIn.css";
function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  const signIn = e=>{
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      navigate('/');     
      console.log(userCredential);
        })
        .catch(error=>alert(error.message));

  };

  const register = e=>{
    e.preventDefault();
    console.log(" I am clicked");

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      if((userCredential)){
        navigate('/');
        console.log("user Registered");
      }
    })
    .catch(error=>alert(error.message));

  };

  return <div className='login'>
  <div className='logo__container'>
  <Link to= "/">
  <img 
        className="login__logo"
        src='https://1000logos.net/wp-content/uploads/2016/10/Amazon_logo_PNG3.png'
        alt="amazon-logo"
      />
      </Link>
  </div>
  
      <div className="login__container">
        <form>
        <h1>
            Sign-In
        </h1>

        <h5>Email</h5>
        <input type="text" value={email} onChange={e=>{setEmail(e.target.value);}}/>

        <h5>Password</h5>
        <input type="password" value={password} onChange={e=>{setPassword(e.target.value);}}/>

        <button className='login__signInButton' onClick={signIn}>Sign In</button>
        </form>

        <p>
        By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest Based Ads Notice.
        </p>

        <button className='login__registerButton' onClick={register}>Create your Amazon account</button>
        </div>
  </div>;
}

export default SignIn;
