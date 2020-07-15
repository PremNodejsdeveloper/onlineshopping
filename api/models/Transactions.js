const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  quantity: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
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

let Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = {
  addNewTransaction: async function (transactionDTO) {
    //create a newUser object with the users provided data
    console.log("transactionDTO ", transactionDTO);
    let newTransaction = new Transactions({
      product_id: transactionDTO.productId,
      user_id: transactionDTO.userId,
      quantity: transactionDTO.quantity,
      total_price: transactionDTO.totalPrice,
      createdAt: Date.now(),
    });

    try {
      let savedTransaction = await newTransaction.save();
      return savedTransaction;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  updateExistingTransaction: async function (transactionDTO) {
    //create a newUser object with the users provided data
    // console.log("transactionDTO34455666666666666 ", transactionDTO);
    let transDtoId = transactionDTO.id;
    delete transactionDTO.id;

    //console.log("after id delete transactionDTO ", transactionDTO);
    try {
      let updatedTransaction = await Transactions.where({
        _id: transDtoId,
      }).update(transactionDTO);
      return updatedTransaction;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  transctionsByUserId_ProductId: async function (userId, productId) {
    let existingtransaction = await Transactions.find({
      user_id: userId,
      product_id: productId,
    });
    return existingtransaction;
  },

  transctionsByUserId: async function (userId) {
    let existingtransaction = await Transactions.find({
      user_id: userId,
    });
    return existingtransaction;
  },
};
