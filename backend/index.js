/* eslint-disable */
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51KWzX9SChXHrIRqr0CVlyyX0GgQff0y5QHO5fhh1ncz9OQ6Qu7ORnrT1WW05tbIi7lq6uuBHEhqTRCGcyqj0QH3600AokBpqZu");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(`mongodb+srv://aniket12:${process.env.password}@cluster0.3zf6s.mongodb.net/amazoneDB`);

const orderSchema = new mongoose.Schema({
    user:Object,
    uid:String,
    remaingDetails:Object,
    amount:Number,
    created: Number
});

const Order = mongoose.model("Order", orderSchema);


// -- API

// -- App config

const app = express();

// -- Middlewares
app.use(cors({origin:true}));
app.use(express.json());

// -- Api routes
app.get("/", (req, res)=>{
    res.status(200).send("Hello World");
});

app.post("/payments/create", async (req,res)=>{
    const total= req.query.total;
    console.log("payment req : ", total);

    const  payment= await stripe.paymentIntents.create({
        amount: total,
        currency:"inr",
    });
    
    console.log(payment);
    res.status(201).send({
        clientSecret:payment.client_secret,
    });
});


app.post("/orders/create", (req,res)=>{
    const uid = req.body.uid;
    const cart = req.body.cart;
    const amount = req.body.amount;
    const created = req.body.created;

    const orderDetails = {
        user:{
            uid:uid,
            remaingDetails:{
                amount: amount,
                cart:cart,
                created:created
            }
        } 
    };

    Order.create(orderDetails, (err, result)=>{
        if(!err){
            console.log("order successfully added", result);
        }
    });

});

app.post("/orders/get", (req,res)=>{
    const uid= req.body.uid;

    Order.find((err,result)=>{
        if(!err){
            const order = result.filter(order=>order.user.uid === uid);
            res.send(order);
        }
    })
});

// -- listen command 
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
} 
app.listen(port, ()=>{
    console.log("server has started");
});


