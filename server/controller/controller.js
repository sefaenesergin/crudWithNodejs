var Userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data);
      res.redirect('/')
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occured while creating a create operation",
      });
    });
};

//return all user
exports.find = (req, res) => {


    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then((data) => {
            res.send(data);
            })
            .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Error to get spesific user",
            });
            });
    }else{
        Userdb.find()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Error occurred while retriving user infotmation",
          });
        });
    };
    }



//update a new idetified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { UseFindAndModify: false })
    .then((data) => {
      if (!req.body) {
        res.status(200).send({
          message: `Can not update user with ${id}.Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

//delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!req.body) {
        res.status(400).send({
          message: `Can not delete user with ${id}. Maybe id is wrong!`,
        });
      } else {
        res.send("User was deleted");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete" });
    });
};
