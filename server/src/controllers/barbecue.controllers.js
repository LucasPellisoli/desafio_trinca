const Barbecue = require("../models/barbecue.model");

async function formatOutput(_barbecue, res) {
  let totalPeople = 0;
  let totalMoney = 0;
  let contributionsUsersId = [];

  _barbecue.contributions.map(function (user) {
    totalMoney += user.value;
    totalPeople++;
    contributionsUsersId.push(user.userId);
  });

    res.send({
      _id: _barbecue._id,
      description: _barbecue.description,
      additionalNotes: _barbecue.additionalNotes,
      criededBy: _barbecue.criededBy,
      date: _barbecue.date,
      withDrink: _barbecue.withDrink,
      valueSuggested: _barbecue.valueSuggested,
      contributions: _barbecue.contributions,
      totalPeople,
      totalMoney,
    });
}

async function formatOutputAll(_allBarbecue, res) {
  let allBarbecue = [];
  _allBarbecue.map((_barbecue) => {
    let totalPeople = 0;
    let totalMoney = 0;

    _barbecue.contributions.map(function (user) {
      totalMoney += user.value;
      totalPeople++;
    });
    allBarbecue.push({
      _id: _barbecue._id,
      description: _barbecue.description,
      criededBy: _barbecue.criededBy,
      date: _barbecue.date,
      totalPeople,
      totalMoney,
    });
  });
  res.send(allBarbecue);
}

exports.create = function (req, res, next) {
  let barbecue = new Barbecue({
    description: req.body.description,
    criededBy: req.body.criededBy,
    additionalNotes: req.body.additionalNotes,
    date: req.body.date,
    withDrink: req.body.withDrink,
    valueSuggested: req.body.valueSuggested,
    contributions: [],
  });

  barbecue.save(function (err, _barbecue) {
    if (err) {
      return next(err);
    }
    formatOutput(_barbecue, res);
  });
};

exports.details = function (req, res, next) {
  Barbecue.findById(req.params.id, function (err, _barbecue) {
    if (err) return next(err);
    formatOutput(_barbecue, res);
  });
};

exports.getAll = function (req, res, next) {
  Barbecue.find({}, function (err, _barbecue) {
    if (err) return next(err);
    formatOutputAll(_barbecue, res);
  });
};

exports.update = function (req, res, next) {
  Barbecue.findById(req.params.id, function (err, barbecue) {
    if (err) return next(err);
    if (barbecue.criededBy !== req.body.userID) {
      res.status(403).send("Voce não esta organizando esse churas");
    }
    barbecue.description = req.body.description || barbecue.description;
    barbecue.withDrink = req.body.withDrink || barbecue.withDrink;
    barbecue.additionalNotes = req.body.additionalNotes || barbecue.additionalNotes;
    barbecue.valueSuggested =
    req.body.valueSuggested || barbecue.valueSuggested;
    barbecue.date = req.body.date || barbecue.date;
    barbecue.contributions = req.body.contributions || barbecue.contributions;
    barbecue.save(function (err, _barbecue) {
      if (err) {
        return next(err);
      }
      formatOutput(_barbecue, res);
    });
  });
};

exports.addUserToBarbecue = function (req, res, next) {
  Barbecue.findById(req.params.id, function (err, barbecue) {
    if (err) return next(err);

    barbecue.contributions.push({
      fullname: req.body.fullname,
      value: req.body.value,
      withDrink: req.body.withDrink,
      wasPaid: req.body.wasPaid,
    });
    barbecue.save(function (err, _barbecue) {
      if (err) {
        return next(err);
      }
      formatOutput(_barbecue, res);
    });
  });
};

exports.updateUserToBarbecue = function (req, res, next) {
  Barbecue.findById(req.params.id, function (err, barbecue) {
    if (err) return next(err);
    let _user = barbecue.contributions.filter(function (user) {
      return user.userId === req.body._id;
    });
    _user = {
      fullname: req.body.fullname || _user.fullname,
      value: req.body.value || _user.value,
      withDrink: req.body.withDrink || _user.withDrink,
      wasPaid: req.body.wasPaid || _user.wasPaid,
    };
    
    barbecue.contributions = barbecue.contributions.filter(function (user) {
      return user._id != req.body._id;
    });
    console.log("1",req.body);

    console.log("1",barbecue.contributions);
    barbecue.contributions.push(_user);
    console.log("2",barbecue.contributions);

    barbecue.save(function (err, _barbecue) {
      if (err) {
        return next(err);
      }
      formatOutput(_barbecue, res);
    });
  });
};

exports.removeUserToBarbecue = function (req, res, next) {
  Barbecue.findById(req.params.id, function (err, barbecue) {
    if (err) return next(err);
    barbecue.contributions = barbecue.contributions.filter(function (user) {
      return user._id != req.body._id;
    });
    barbecue.save(function (err, _barbecue) {
      if (err) {
        return next(err);
      }
      formatOutput(_barbecue, res);
    });
  });
};

exports.delete = function (req, res, next) {
  Barbecue.findByIdAndDelete(req.params.id, function (err, user) {
    if (err) return next(err);
    res.send("Barbecue deletado com sucesso");
  });
};
