const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let BarbecueSchema = new Schema({
  description: { type: String, required: true },
  additionalNotes: { type: String },
  criededBy: { type: String, required: true },
  withDrink: Boolean,
  valueSuggested: Number,
  date: { type: Date, required: true },
  contributions: [
    {
      fullname: String,
      value: Number,
      wasPaid: Boolean,
    },
  ],
});

module.exports = mongoose.model("barbecue", BarbecueSchema);
