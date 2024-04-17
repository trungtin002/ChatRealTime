var express = require('express');
var router = express.Router();
var userModel = require('../schema/user');
var bcrypt = require('bcrypt');
var config = require('../config/config');
var protect = require('../middleware/protectLogin');
var checkvalid = require('../validators/auth')
var { validationResult } = require('express-validator');

router.post('/register',checkvalid(), async function(req, res, next) {
    var result = validationResult(req);
    if (result.errors.length > 0) {
        res.status(404).send(result.errors);
        return;
    }
    // register a new account
    try {
        var {fullname, email, username, password, confirmPassword, gender} = req.body;
        
        if(!confirmPassword == password) {
            res.status(400).send('Mat khau khong khop');
        }
        var user = await userModel.findOne({username});
        if (user) {
            res.status(400).send('Username da ton tai');
        }
        // set up avatar (boy or girl)
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        var newUser = new userModel({
            fullname,
            username,
            password,
            email,
            gender,
            profilePic: gender == 'male'? boyProfilePic : girlProfilePic,
        });
          
        await newUser.save();         
        res.status(200).json({
            _id: newUser._id,
			fullname: newUser.fullname,
			username: newUser.username,
			profilePic: newUser.profilePic,
            email: newUser.email
        });
    } catch (error) {
        res.status(400).json(error.message);
    }      
});

router.post('/login', async function(req, res, next) {
// login user have bcrypt password and create token

    try {
        var user = await userModel.findOne({username: req.body.username});
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var tokenUser = user.genJWT();
                res.status(200).cookie('token', tokenUser, {
                    expires: new Date(Date.now() + config.COOKIES_EXP_HOUR * 3600 * 1000),
                    httpOnly: true
                  }).json({
                    _id: user._id,
                    fullname: user.fullname,
                    username: user.username,
                    profilePic: user.profilePic,
                });
                  
                 
            } else {
                res.status(400).send("Wrong password");
            }
        } else {
            res.status(400).send("Wrong username");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get('/me', protect ,async function(req, res, next) {
    return await res.status(200).send({
        success: true,
        data: req.user
    });
});

router.post('/logout', function(req, res, next) {
    try {
		res.clearCookie("token");
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});


module.exports = router;