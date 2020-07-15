//const Users = require("../models/users");
const validateName = require("../utils/usernameValidator");
const verifyMobNo = require("../utils/verifymobileNo");
const verifyEmail = require("../utils/verifyemail");

function validate(userDTO) {
  let userData = {};
  userData.phone = false;
  userData.email = false;
  userData.firstName = false;
  userData.lastName = false;

  let verifiedFirstName, verifiedLastName;
  let verifiedMobileNo,
    verifiedEmail = false;
  verifiedFirstName = validateName.validateUsername(userDTO.firstName);
  verifiedLastName = validateName.validateUsername(userDTO.lastName);
  verifiedMobileNo = verifyMobNo.verifyMobileNo(userDTO.phone);
  verifiedEmail = verifyEmail.velidateEmail(userDTO.email);

  if (verifiedFirstName === null) {
    userData.firstName = true;
  }

  if (verifiedLastName === null) {
    userData.lastName = true;
  }
  if (verifiedEmail === true) {
    userData.email = true;
  }
  if (verifiedMobileNo === true) {
    userData.phone = true;
  }

  return userData;
}

module.exports = {
  validate,
};
