import express from "express";
import colors from"colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db/mongoconfig.js";
import authRouter from "./routes/authRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from './routes/productRouter.js';

var app=express();
dotenv.config({path:'./config.env'});
app.use(express.json());
app.use(morgan('dev'));

dotenv.config();
connectDB();



app.use('/api/v1/auth', authRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/product",productRouter);



app.listen(8080,()=>{
    console.log("Hello world");
});