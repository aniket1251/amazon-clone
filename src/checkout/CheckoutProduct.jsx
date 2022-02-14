import React from 'react';
import "./Checkout.css";
import { useStateValue } from '../StateProvider';

function CheckoutProduct(props) {

    const[{cart}, dispatch]= useStateValue();

  const removeFromCart=()=>{
    dispatch({
      type:"REMOVE_FROM_CART",
      item: {
        id: props.id,
        title:props.title,
        image: props.image,
        price:props.price,
        rating:props.rating
      },
    });
  };

  return <div className = 'checkout__product'>

  <div className = 'checkout__product__left'>
  
  <img className='product__image' src={props.image} alt=""/>
  </div>
    <div className='checkout__product__right'>
    <div className='product__info'>
      <p>{props.title}</p>
    </div>
    <div className='product__price'>
    <p><small>$</small>
      <strong>{props.price}</strong></p> 
    </div>
    <div className='product__rating'>
     {Array(props.rating).fill().map((_,i)=>{
       return <p>⭐</p>
     })
     }
    </div>
    <div className='product__button'>
    <button onClick={removeFromCart}>Remove from cart</button>
    </div>
    </div>
  </div>;
}

export default CheckoutProduct;
