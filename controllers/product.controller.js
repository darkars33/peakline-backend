const Product = require('../model/product.schema');
const cloudinary = require('cloudinary').v2;


const getProducts = async(req, res) =>{
          try {
                    
                    const products = await Product.find();

                    return res.status(201).json({
                              data: products,
                              success: true
                    });

          } catch (error) {
                    console.log('error', error.message);
                    res.status(500).json({message: error.message});
          }
}

const getProductById = async(req, res) =>{
          try {
                   const {id} = req.params;

                   const product = await Product.findById(id);

                   if(!product){
                     res.status(404).json({message: "Product not found"});
                   }

                   return res.status(201).json({
                              data: product,
                              success: true
                   });
                    
          } catch (error) {
                    console.log("error", error.message);
                    res.status(500).json({message: error.message});
          }
}

const addProduct = async(req, res) =>{
          try {
                  const {name, price, description, category, image, stock} = req.body;

                  let imageURL;

                  if(image){
                    const result = await cloudinary.uploader.upload(image, {
                              upload_preset: "ecommerce"
                    });

                    imageURL = result.secure_url;
                  }

                  const newProduct = new Product({
                              name,
                              price,
                              description,
                              category,
                              image: imageURL,
                              stock
                  })

                  await newProduct.save();

                  return res.status(200).json({
                    message: "Product Created Successfully",
                    success: true
                  })

          } catch (error) {
                    console.log("error", error.message);
                    res.status(500).json({message: error.message});
          }
}

const deleteProduct = async (req, res) =>{
  try {
      const {id} = req.params;

      const product = await Product.findByIdAndDelete(id);

      if(!product){
        res.status(404).json({message: "Product not found"});
      }

      return res.status(200).json({
        message: "Product deleted successfully",
        success: true
      });

  } catch (error) {
      console.log("error", error.message); 
      res.status(500).json({message: error.message});
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    

    
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
    });

  } catch (error) {
    console.log("Error updating product:", error.message);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
          getProducts,
          getProductById,
          addProduct,
          deleteProduct,
          updateProduct
}