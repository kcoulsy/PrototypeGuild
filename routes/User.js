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
  body.enabled = "false";

  const user = new User(body);
  user
    .save()
    .then(() => {
      return user.createToken("x-auth");
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};

exports.find = (req, res) => {
  let q = pick(req.body, ["username", "_id"]);

  if (q.username) {
    q.username = { $regex: `^${q.username}` };
  }

  if (q === {}) q = null;

  User.find(q).then(response => {
    res.send(response);
  });
};

exports.findSelf = (req, res) => {
  res.send(req.user);
};

exports.login = (req, res) => {
  const body = pick(req.body, ["username", "password"]);
  
  User.findByCredentials(body.username, body.password)
    .then(user => {
      user.createToken("x-auth").then(token => {
        res.header("x-auth", token).send(user);
      });
    })
    .catch(e => res.status(400).send());
};

exports.logout = (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    err => {
      res.staus(400).send();
    }
  );
};
