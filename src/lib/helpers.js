const bcrypt = require("bcryptjs");

const helper = {};

helper.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helper.matchPassword = async (password, passwordDB) => {
  try {
    return await bcrypt.compare(password, passwordDB);
  } catch (error) {
    console.log("Error to compare passwords");
  }
};

module.exports = helper;
