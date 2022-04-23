"use strict";
const bcrypt = require("bcrypt");

const passwordHash = async (pass) => {
  const passw = await bcrypt.hash(pass, 10);
  return passw;
};

module.exports = passwordHash;