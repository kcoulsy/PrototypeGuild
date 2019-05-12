const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      type: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ],
  characterName: {
    type: String
  },
  discordTag: {
    type: String
  },
  playerClass: {
    type: String
  },
  playerSpec: {
    type: String
  },
  rank: {
    type: String
  },
  professionOne: {
    type: String
  },
  professionTwo: {
    type: String
  },
  applicationJSON: {
    type: String
  }
});

UserSchema.methods.createToken = function(type) {
  const token = jwt
    .sign(
      {
        _id: this._id.toHexString(),
        type
      },
      process.env.JWT_SECRET
    )
    .toString();
  this.tokens = [
    {
      type,
      token
    },
    ...this.tokens
  ];

  return this.save().then(() => token);
};

UserSchema.methods.removeToken = function(token) {
  return this.updateOne({
    $set: {
      tokens: []
    }
  });
};

UserSchema.statics.findByToken = function(token) {
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return this.findOne({
    _id: decoded._id,
    "tokens.type": "x-auth",
    "tokens.token": token
  });
};

UserSchema.statics.findByCredentials = function(username, password) {
  return this.findOne({ username }).then(user => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = {
  User
};
