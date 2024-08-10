import mongoose from "mongoose";


const Admin_schema=new mongoose.Schema({
    username:{type:String},
    password:{type:String},
    confirmpassword:{type:String}

})



export default mongoose.model.Admin||mongoose.model("Admin",Admin_schema);