const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
          name:{
                    type:String,
                    required:[true, "Product name is required"]
          },
          price:{
                    type:String,
                    required:[true, "Product price is required"]
          },
          description:{
                    type:String,
                    required: [true, "Product description is required"]
          },
          category:{
                    type: String,
                    required:[true, "Product category is required"]
          },
          image:{
                    type: String
          },
          stock:{
                    type:String,
                    required:[true, "Product stock is required"]
          }
})

const product = mongoose.model('product', productSchema);

module.exports = product;