import React from 'react';
import "./Product.css";
import { useStateValue } from '../StateProvider';

function Product(props) {

  const[{cart}, dispatch]= useStateValue();

  const addToCart=()=>{
    dispatch({
      type:"ADD_TO_CART",
      item: {
        id: props.id,
        title:props.title,
        image: props.image,
        price:props.price,
        rating:props.rating
      },
    });
  };

  return(<div className='product__container'>
    <div className='product__info'>
      <p>{props.title}</p>
    </div>
    <div className='product__price'>
    <p><small>₹</small>
      <strong>{props.price}</strong></p> 
    </div>
    <div className='product__rating'>
     {Array(props.rating).fill().map((_,i)=>{
       return <p>⭐</p>
     })
     }
    </div>

    <img className='product__image' src={props.image} alt=""/>
    <div className='product__button'>
    <button onClick={addToCart}>Add to Cart</button>
    </div>
    
      
  </div>);
}

export default Product;
