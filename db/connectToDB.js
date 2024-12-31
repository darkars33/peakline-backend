const mongoose = require('mongoose');

const connectToDB = async() =>{
          try {
                   const connect =  await mongoose.connect(process.env.MONGODB_URL);
          
                   if(connect.connection.readyState === 1){
                              console.log("connect to DB");
                   }
                    
          } catch (error) {
                    console.log('error', error.message);
          }
}

module.exports = connectToDB