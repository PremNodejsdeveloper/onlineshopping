let Products = require("../models/Products");
let buildResponse = require("../utils/responseFormatter");
module.exports = {
  addNewProduct: async function (productDTO) {
    try {
      let customeResponse;

      //let validResult = validateproductData.validate(productDTO);
      //if (validResult.firstName === true && validResult.phone === true) {
      if (true) {
        let existingProduct = await Products.findProductByName(productDTO.name);
        console.log(existingProduct);
        if (Object.keys(existingProduct).length != 0) {
          customeResponse = buildResponse.errorResponse(
            403,
            "Product already exists"
          );
          return customeResponse;
        } else {
          // calling productModel methods to insert the data in database
          let productRecord = await Products.addNewProduct(productDTO);
          customeResponse = buildResponse.successResponse(
            200,
            "product Successfully regiested to db",
            productRecord
          );
          return customeResponse;
        }
      } // else {
      //     return buildResponse.errorResponse(400, "inputs are not valid input");
      //   }
    } catch (error) {
      customeResponse = buildResponse.errorResponse(
        500,
        "Some Exception Occured",
        error.message
      );
      return customeResponse;
    }
  },
};
