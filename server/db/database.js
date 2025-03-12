import mongoose from "mongoose";


const connectDB = async () =>{
    console.log('Environment Variables:',process.env.MONGODB_URI)
    
try{
    await mongoose.connect(process.env.MONGODB_URI , {
       
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        socketTimeoutMS: 45000
    });
    console.log('mongodb connected');
    
    }
    catch(error){
        console.error('not connected');

    }
}
export default connectDB ;