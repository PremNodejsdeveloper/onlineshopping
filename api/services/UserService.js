let Users = require("../models/Users");
let Products = require("../models/Products");
let Transactions = require("../models/Transactions");
let buildResponse = require("../utils/responseFormatter");
let validateUserData = require("../utils/validateUserData");

module.exports = {
  createNewUser: async function (userDTO) {
    try {
      let customeResponse;

      //let validResult = validateUserData.validate(userDTO);
      //if (validResult.firstName === true && validResult.phone === true) {
      if (true) {
        let existingMobileNo = await Users.findUserByPhone(userDTO.phone);

        if (Object.keys(existingMobileNo).length != 0) {
          customeResponse = buildResponse.errorResponse(
            403,
            "user already exists"
          );
          return customeResponse;
        } else {
          // calling userModel methods to insert the data in database
          let userRecord = await Users.createUser(userDTO);
          customeResponse = buildResponse.successResponse(
            200,
            "User Successfully regiested to db",
            userRecord
          );
          return customeResponse;
        }
      } else {
        return buildResponse.errorResponse(400, "inputs are not valid input");
      }
    } catch (error) {
      customeResponse = buildResponse.errorResponse(
        500,
        "Some Exception Occured",
        error.message
      );
      return customeResponse;
    }
  },

  addUserProductInfo: async function (userProductDTO) {
    try {
      let customeResponse, userId, productId;
      //console.log("userProductDTO __> ", userProductDTO);
      // let validResult = validateUserData.validate(userProductDTO);
      if (userProductDTO) {
        let existingMobileNo = await Users.findUserByPhone(
          userProductDTO.phone
        );
        userId = existingMobileNo[0].id;
        console.log("user Id is ", userId);
        if (Object.keys(existingMobileNo).length != 0) {
          //calling Product models if product exists or not
          let existingProduct = await Products.findProductByName(
            userProductDTO.transaction.product.name
          );
          productId = existingProduct[0].id;
          console.log("ProductId ", productId);
          if (Object.keys(existingProduct).length != 0) {
            let existingTransactions = await Transactions.transctionsByUserId_ProductId(
              userId,
              productId
            );
            if (Object.keys(existingTransactions).length == 0) {
              let transactionDTO = {};
              transactionDTO.productId = productId;
              transactionDTO.userId = userId;
              transactionDTO.quantity =
                userProductDTO.transaction.product.quantity;
              transactionDTO.totalPrice =
                userProductDTO.transaction.product.unit_price *
                userProductDTO.transaction.product.quantity;
              let createNewTransaction = await Transactions.addNewTransaction(
                transactionDTO
              );
              customeResponse = buildResponse.successResponse(
                200,
                "User transctions data Successfully inserted to db",
                createNewTransaction
              );
            } else {
              let updateTransDTO = {};
              updateTransDTO.id = existingTransactions[0].id;
              updateTransDTO.productId = productId;
              updateTransDTO.userId = userId;
              updateTransDTO.quantity =
                userProductDTO.transaction.product.quantity +
                existingTransactions[0].quantity;
              updateTransDTO.totalPrice =
                userProductDTO.transaction.product.unit_price *
                userProductDTO.transaction.product.quantity;
              updateTransDTO.total_price =
                updateTransDTO.totalPrice + existingTransactions[0].total_price;

              let updateNewTransaction = await Transactions.updateExistingTransaction(
                updateTransDTO
              );
              console.log(
                "nmodiefied     ",
                typeof updateNewTransaction.nModified
              );
              if (updateNewTransaction.nModified == 1) {
                console.log("updateNew Transciton ", updateNewTransaction);
                customeResponse = buildResponse.successResponse(
                  200,
                  "User transctions data updated in db",
                  updateNewTransaction
                );
              } else {
                customeResponse = buildResponse.errorResponse(
                  400,
                  "user product transction data not updated"
                );
              }
            }
          }
          return customeResponse;
        } else {
          return customeResponse;
        }
      } //else {
      //   return buildResponse.errorResponse(400, "inputs are not valid input");
      // }
    } catch (error) {
      customeResponse = buildResponse.errorResponse(
        500,
        "Some Exception Occured",
        error.message
      );
      return customeResponse;
    }
  },

  getAllUsers: async function () {
    try {
      let customeResponse;
      let existingUsersData = await Users.findAllUsers();
      let finalData = [];
      for (let i = 0; i < existingUsersData.length; i++) {
        let eachUsersTransctions = await Transactions.transctionsByUserId(
          existingUsersData[i].id
        );
        let userTransRecord = {};
        let latestTransctions;
        userTransRecord.name = existingUsersData[i].name;
        userTransRecord.phone = existingUsersData[i].phone;
        userTransRecord.address = existingUsersData[i].address;
        userTransRecord.total_transctions = eachUsersTransctions.length;
        latestTransctions = eachUsersTransctions.pop();
        userTransRecord.latest_transaction_detail = {};
        if (latestTransctions) {
          userTransRecord.latest_transaction_detail.product_id =
            latestTransctions.product_id;
          userTransRecord.latest_transaction_detail.quantity =
            latestTransctions.quantity;
          userTransRecord.latest_transaction_detail.totalPrice =
            latestTransctions.total_price;
        }

        finalData.push(userTransRecord);
      }

      if (finalData.length > 0) {
        customeResponse = buildResponse.successResponse(
          200,
          "users record fetched succefully",
          finalData
        );
        return customeResponse;
      }
      customeResponse = buildResponse.successResponse(
        404,
        "users record not found",
        result
      );
      return customeResponse;
    } catch (error) {
      console.log("error occured during fetching users record =>", error);
      customeResponse = buildResponse.errorResponse(500, "some error occured");
      return customeResponse;
    }
  },
};
