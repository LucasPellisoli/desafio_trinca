var User = require("../models/user.model");

exports.create = function (req, res, next) {
  let user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    foodRestriction: req.body.foodRestriction,
  });
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.send(user._id);
  });
};

exports.details = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.send(user);
  });
};

exports.update = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.foodRestriction = req.body.foodRestriction || user.foodRestriction;
    user.save(function (err, user) {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
  });
};

exports.delete = function (req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, user) {
    if (err) return next(err);
    res.send("Usuario deletado com sucesso");
  });
};

exports.login = function (req, res, next) {
  User.find({ email: req.body.email }, function (err, _user) {
    if (err) return next(err);
    if (!(_user.length > 0)) {
      res.status(401).send("Usuario não encontrado!");
    } else if (req.body.password !== `${_user[0].password}`) {
      res.status(401).send("Usuario não encontrado!");
    }
    res.send(_user[0]._id);
  });
};
