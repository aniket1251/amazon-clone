/* eslint-disable */
import React, { useEffect, useState } from 'react';
import "./Payment.css";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from '../checkout/CheckoutProduct';
import {useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import { getCartTotal } from '../reducer';
import CurrencyFormat from 'react-currency-format';
import axios from '../axios';
import { useNavigate } from 'react-router';


function Payment() {
    const navigate = useNavigate();
    const[{cart, user}, dispatch]= useStateValue();

    const [error, setError] = useState(null);
    const [disabled, setDisabled ] = useState(true);
    const [prossessing, setProssessing] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(()=>{
        const getClientSecret = async ()=>{
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${Math.round(getCartTotal(cart)*100) }`
            });
            setClientSecret(response.data.clientSecret);
        };
        getClientSecret();

    }, []);
    
    console.log("clientSecret:",clientSecret);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setProssessing(true)

        await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then((payment)=>{
            // console.log("started created doc");
            // console.log("😏", payment);
            
            axios.post("/orders/create", {
                cart: cart,
                uid:user?.uid,
                amount: payment.paymentIntent.amount,
                created: payment.paymentIntent.created
            } );

            console.log("created doc");
            setSuccessful(true);
            setError(null);
            setProssessing(false);

            dispatch({
                type: 'EMPTY_CART'
            });
            navigate("/orders", {replace:true});
        }).catch((err)=>console.warn(err));
    }

    const handleChange = event=>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }



  return (
    <div className='payment'>
            <div className='payment__heading'>
                <h2>Checkout({cart?.length})</h2>
            </div>
            <div className='matter'>
            <div className='payment__address'>
                <div className='small_heading'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='details'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>
            <div className='payment_items'>
                <div className='small_heading'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='items'>
                {cart.map((item)=>
                    <CheckoutProduct
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                        image={item.image}
                    />
                )}
                </div>
            </div>
            <div className='payment_card'>
                <div className='small_heading'>
                    <h3>Payment Method</h3>
                </div>
                <div className='card__details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                        <div className='price__total'>
                        <CurrencyFormat 
                            value={getCartTotal(cart)} 
                            decimalScale={2}
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'₹'} 
                            renderText={value => (
                                <>
                                    <p>total ({cart.length} items): <strong>{value}</strong>
                                    </p>
                                </>
                            )} />
                                <button className='payment__button' disabled={disabled || prossessing || successful}>
                                    <span>{prossessing ? <p>Prossessing</p>: "Buy Now"}</span>
                                </button>  
                        </div>
                                
                                
                                 {/* {/* Errors */}
                                {error && <div>{error}</div>} 



                        </form>
                       
                </div>
            </div>

            </div>
           
    </div>
  )
}

export default Payment