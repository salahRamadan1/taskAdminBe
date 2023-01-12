const { Schema, model, SchemaTypes } = require("mongoose");
const bcrypt = require("bcrypt");
const schema = new Schema({
  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
    minlength: [2, "soo short first name"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
    trim: true,

    minlength: [2, "soo short last name"],
  },
  email: {
    type: String,
    required: [true, "email  is required"],
    trim: true,
    // unique: [true, "email  already exits"],
  },
  password: {
    type: String,
    minlength: [6, "soo short Password"],
  },
  Phone: {
    type: String,
  },
  addresses: {
    type: String,
    default: "",
  },
  confirmEmail: {
    type: Boolean,
    default: false,
  },
});
schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, process.env.saltRounds * 1);
});
 

module.exports = model("User", schema);
