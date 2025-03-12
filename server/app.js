import express from 'express';
import connectDB  from './db/database.js';
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js"
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";
import { dirname } from 'path/posix';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000 ;
const __dirname = path.resolve();


// Connect to MongoDB
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "https://todo-emlk.onrender.com/" ,
    credentials: true
})) ;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.use(express.static(path.join(__dirname,"/client/dist")));
app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "client","dist","index.html"));
});
app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        (`Server listening on http://localhost:${port}`);
    }
});
