const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: Number, required: true },
  foodRestriction: [{ type: String }],
});

module.exports = mongoose.model("user", UserSchema);
