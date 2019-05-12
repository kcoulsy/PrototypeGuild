const pick = require("lodash/pick");

const { User } = require("./../Models/User");

exports.create = (req, res) => {
  const body = pick(req.body, [
    "username",
    "password",
    "characterName",
    "discordTag",
    "playerClass",
    "playerSpec",
    "professionOne",
    "professionTwo",
    "applicationJSON"
  ]);
  body.rank = "Member";

  const user = new User(body);
  user
    .save()
    .then(() =>{
        return user.createToken("x-auth")
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
        res.status(400).send(e)
    });
};
