import express from 'express'
import { connectDB } from './config/dbconection.js';
import dotenv from 'dotenv'
import authRoutes  from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors'
//load env variables
dotenv.config();

//app server
const app = express();
const PORT = process.env.PORT;


//db connection
connectDB();

//middleware
app.use(
  cors({
    origin: process.env.FRONTED_LINK, // frontend URL
    credentials: true,
  })
);
app.use(express.json());

//route
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/task',taskRoutes);


app.get("/",(req,res) =>{
      res.send("Welcome to taskify");
})
app.listen(  PORT,() =>{
    
      console.log(`server runing on port ${PORT}`);
})