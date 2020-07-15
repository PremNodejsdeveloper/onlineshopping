const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
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

let Users = mongoose.model("Users", userSchema);

module.exports = {
  createUser: async function (userDTO) {
    //create a newUser object with the users provided data
    console.log("userDTO ", userDTO);
    let newUser = new Users({
      name: userDTO.name,
      phone: userDTO.phone,
      address: userDTO.address,
      createdAt: Date.now(),
    });

    try {
      let savedUser = await newUser.save();
      return savedUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  findUserByPhone: async function (checkPhoneNo) {
    let registerdUser = await Users.find({ phone: checkPhoneNo });
    return registerdUser;
  },

  findAllUsers: async function () {
    let registerdUser = await Users.find({});
    return registerdUser;
  },
};
