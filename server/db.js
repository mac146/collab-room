const mongoose=require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.mongoose_url)

const Schema=mongoose.Schema


const user=new Schema({

    email: {type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String
})


const userModel = mongoose.model("users", user);


module.exports = {
    userModel
};