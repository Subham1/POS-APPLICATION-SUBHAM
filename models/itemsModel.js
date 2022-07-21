// import mongoose
const mongoose = require("mongoose");

// create schema for items
const Schema = mongoose.Schema;
const itemsSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now
}
},{
    timestamps : true
});

const itemsModel = mongoose.model("items", itemsSchema);
module.exports = itemsModel;
