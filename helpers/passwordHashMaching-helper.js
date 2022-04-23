"use strict";
const bcrypt = require("bcrypt");

const passwordHashMatching = async (pass, Hash) => {
  const passw = await bcrypt.compare(pass, Hash);
  return passw;
};

module.exports = passwordHashMatching;
