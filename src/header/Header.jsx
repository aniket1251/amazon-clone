import React from "react";
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import {auth} from "../firebase";



function Header() {
  const[{cart,user}, dispatch]= useStateValue();

  const handleClick = ()=>{
    if(user){
      auth.signOut();
    }
  }

  return (
    <div className="header">
      <Link to="/">
      <img
        className="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="amazon-logo"
      />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
      <SearchIcon className="header__searchIcon"/>
      </div>
      <div className="header__nav">
      <Link to = {!user &&"/signIn"}>
      <div className="header__option">
          <span className="header__optionFirstLine">Hello</span>
          <span className="header__optionSecondLine" onClick={handleClick}>{user? "sign out" : "sign in"}</span>
        </div>
      </Link>
        <div className="header__option">
          <span className="header__optionFirstLine">Returns</span>
          <span className="header__optionSecondLine">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionFirstLine">Your</span>
          <span className="header__optionSecondLine">Prime</span>
        </div>
        <Link to="/checkout">
        <div className="header__optionCart">
            <ShoppingBasketIcon/>
            <span className="header__optionSecondLine header__CartCount">{cart?.length}</span>
        </div>
        </Link>
         
      </div>
    </div>
  );
}

export default Header;
