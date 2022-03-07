import moment from 'moment';
import React from 'react';
import './Order.css';
import CheckoutProduct from '../checkout/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order(props) {
  return (
    <div className='order'>
         <h2>Order</h2>
         <p>{moment.unix(props.order.data.created).format("MMMM Do YYYY, h:mma")}</p>
         <p className='order__id'>
             <small>{props.order.id}</small>
         </p>
         {props.order.data.cart?.map(item=>(
             <CheckoutProduct
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                        image={item.image}
                        hidebutton
             />
         ))}
         <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={props.order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />  
    </div>
  )
}

export default Order;