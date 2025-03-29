import mongoose from "mongoose";

const todoSchema =mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type: String,
        default : 'pending'
    },
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    }
})

let Todos = mongoose.model('Todos',todoSchema)

export default Todos;