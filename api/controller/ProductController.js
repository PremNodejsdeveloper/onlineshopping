const productService = require("../services/ProductService");

module.exports = {
  addNewProduct: async function (request, response, next) {
    try {
      let productDTO = request.body;
      let result = await productService.addNewProduct(productDTO);
      response.status(result.code).json(result);
    } catch (error) {
      console.log("error occured during signUp =>", error);
      response.status(500).json("some error occured");
    }
  },
};
