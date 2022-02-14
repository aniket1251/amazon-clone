import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../StateProvider";
import Subtotal from "./Subtotal";

function Checkout() {

  const[{cart,user}, dispatch]= useStateValue();

  return (<div className="checkout">
    <div className="checkout__left">
    <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h3>{user && <>Hello, {user?.email}</>}</h3>
        <div className="checkout__title"><h2>Your Shopping Cart</h2></div>

        {cart.map((item)=>
        <CheckoutProduct
          id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
        />
        )}
    </div>

    <div className="checkout__right">
        <Subtotal/>
    </div>
  </div>);
}

export default Checkout;
