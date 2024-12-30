import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import { specs, swaggerUi } from './swagger.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
    console.log(`Connected to mongo Db`)
}).catch((error) => {
    console.log(error)
});


const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
    console.log('Server is running on port 3000')
});




app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
//app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});