import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error.js'
import connectDB from "./config/db.js";
import userRouter from './routes/users.js'
import itemsRouter from './routes/items.js'


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false})); // for forms

app.use(cookieParser());
app.use(cors());
app.use(errorHandler);


app.use('/api/users', userRouter);
app.use('/api/items', itemsRouter);

const start = async () => {
    try{
        await connectDB();
        app.listen(PORT,
            ()=> console.log(`Running server on: http://localhost:${PORT}`))
    }catch (e) {
        console.log(e);
    }
}
await start();