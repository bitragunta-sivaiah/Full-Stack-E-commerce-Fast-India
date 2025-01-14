import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet'
import connectDB from './config/DB.js';
import { authRouter } from './routes/user.route.js';
import { categoryRouter } from './routes/category.route.js';
import uploadRouter from './routes/upload.router.js';
import { subCategoryRouter } from './routes/subcategory.route.js';
import { productRouter } from './routes/product.route.js';
import cartRouter from './routes/cart.router.js';
import addressRouter from './routes/address.route.js';
import orderRouter from './routes/order.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy:false,
}));

const PORT = 3000 || process.env.PORT  




// routes 
app.use('/api/auth',authRouter)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/subcategory',subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)

app.get('/', (req, res) => {
    res.send('Hello, World!')
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});