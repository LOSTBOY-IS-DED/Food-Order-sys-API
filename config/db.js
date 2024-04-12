const mongoose = require('mongoose');

//function for mongodb connection 
const connectDb = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to database")
  }catch(error){
    console.log('DB error', error);
  }
}

module.exports = connectDb ;
