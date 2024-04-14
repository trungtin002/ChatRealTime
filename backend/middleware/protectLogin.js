var jwt = require('jsonwebtoken');
var userModel = require('../schema/user');
var config = require('../config/config');

module.exports = async function(req, res, next) {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        console.log(token);
    }else{
        if(req.cookie.token){
            token = req.cookie.token;
        }
    }
    if(!token){
        return res.status(401).send({
            success: false,
            data: "Vui lòng đăng nhập!!!"
        });
    }
    try {
        let info = jwt.verify(token,config.JWT_SECRETKEY)
        if(info.exp * 1000 > Date.now()) {
            let id = info.id;
            let user = await userModel.findById(id);
            req.user = user;
            next();
        }else{
            return res.status(401).send({
                success: false,
                data: "Vui lòng đăng nhập!!!"
            });
        }
    } catch (error) {
        return res.status(401).send({
            success: false,
            data: "Vui lòng đăng nhập!!!"
        });
    }
};