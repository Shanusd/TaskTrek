import mongoose, { connect } from "mongoose"

const connectDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo db  connected successfully")   
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;