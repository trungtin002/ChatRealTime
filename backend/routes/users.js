var express = require('express');
var router = express.Router();
var userModel = require('../schema/user');
var bcrypt = require('bcrypt');
var protect = require('../middleware/protectLogin');

router.get('/getUser',protect,async function(req, res, next) {

  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).send({
      success: false,
      data: error.message
    })
  }
});
router.get('/:id',async function(req, res,next){
  try {
    let user = await userModel.find({ _id: req.params.id }).exec();
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put('/:id',async function(req, res, next) {
  try {
    let user = await userModel.findByIdAndUpdate
      (req.params.id, req.body).exec()
      
    res.status(200).send({
      success: true,
      data: "Successfully updated"
    });
  } catch (error) {
    res.status(404).send(error);
  }
});


module.exports = router;