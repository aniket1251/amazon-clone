import React, { useEffect, useState } from 'react';
import {useStateValue} from "../StateProvider";
import Order from './Order';
import "./Orders.css";
import axios from '../axios';


function Orders() {
  const [{cart, user}, dispatch]= useStateValue();
  const [orders, setOrders]= useState([]);

  useEffect(() => {
   if(user){

    axios.post("/orders/get", {
      uid:user?.uid
    }).then((res)=>{
      console.log();
      setOrders(res.data.map(doc => ({
            id: doc.id,
            data: doc.user.remaingDetails
        })))
    });

   }else{
     setOrders([]);
   }
  }, [user])
  
  return (
    <div className='orders'>
      <h1>Your Orders</h1>
        <div className='single__order'>
          {orders?.map(order=>(
            <Order order={order}/>
          ))}
        </div>

    </div>
  )
}

export default Orders;