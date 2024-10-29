import express, { request } from "express"
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//middleware for handling cors policy 
//1. allow all origin with default of cors(*)
app.use(cors())
//2. allow all origin with default of cors(*)

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome To Mern Stack Tutorial')
})

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });