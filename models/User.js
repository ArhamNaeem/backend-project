const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
  },
  moviesRated: {
    type: Number,
    default: 0,
  },
  ticketsBought: {
    type: Number,
    required: true,
    default: 0,
  },

  blocked: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  VIP: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 188,
  },
  trialBonus: {
    type: Number,
    default: 188,
  },
  totalDayEarn: {
    type: Number,
    default: 0,
  },
  lastEarnedDate: {
    type: Date,
  },
  movieShown: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

// UserSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.isBlocked = function () {
  return this.blocked;
};

// UserSchema.methods.comparePassword = async function (canditatePassword) {
//   const isMatch = await bcrypt.compare(canditatePassword, this.password);
//   console.log(canditatePassword,this.password,isMatch)
//   return isMatch;
// };

module.exports = mongoose.model("User", UserSchema);
