"use strict";
const passwordHash = require("../helpers/passwordHash-helper");

async function passwordHasherMiddleware(next) {
  if (this.isModified("password")) {
    this.password = await passwordHash(this.password);
  }
  next();
}

module.exports = passwordHasherMiddleware;