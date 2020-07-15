const userService = require("../services/UserService");

module.exports = {
  // add user, product data

  addUsers: async function (request, response, next) {
    try {
      let userDTO = request.body;
      let result = await userService.createNewUser(userDTO);
      response.status(result.code).json(result);
    } catch (error) {
      console.log("error occured during signUp =>", error);
      response.status(500).json("some error occured");
    }
  },

  userProductInfo: async function (request, response, next) {
    try {
      let bodyData = request.body;
      let result = await userService.addUserProductInfo(bodyData);
      //let result = bodyData;
      response.status(200).json(result);
    } catch (error) {
      console.log("error occured during adding user product data  =>", error);
      response.status(500).json("some error occured");
    }
  },

  // get user list for the transctions
  getUsersList: async function (request, response) {
    try {
      let result = await userService.getAllUsers();
      response.status(200).json(result);
    } catch (error) {
      console.log("error occured during fetching Movie Record =>", error);
      response.status(500).json("some error occured");
    }
  },
};
