import express from 'express';
import connectDB  from './db/database.js';
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js"
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// Connect to MongoDB
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log("SECRET_KEY:", process.env.SECRET_KEY);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);
app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server listening on http://localhost:${port}`);
    }
});
