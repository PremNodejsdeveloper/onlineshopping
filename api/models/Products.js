const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  unit_price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

let Products = mongoose.model("Products", productSchema);

module.exports = {
  addNewProduct: async function (productDTO) {
    //create a newUser object with the users provided data
    console.log("productDTO ", productDTO);
    let newProduct = new Products({
      name: productDTO.name,
      unit_price: productDTO.unit_price,
      description: productDTO.description,
      createdAt: Date.now(),
    });

    try {
      let savedProduct = await newProduct.save();
      return savedProduct;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  findProductByName: async function (checkProductName) {
    let existingProduct = await Products.find({ name: checkProductName });
    return existingProduct;
  },
};
