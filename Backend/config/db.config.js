const mongoose = require('mongoose');
const connection  = () =>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('MongoDB connected successfully')
    })
    .catch((err)=>{
        console.log('MongoDB connection failed : ',err)
    })
}

module.exports = connection