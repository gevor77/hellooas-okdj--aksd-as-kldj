const bcrypt = require('bcrypt');
const Login = require('../model/Login');
const Registration = require('../model/Registration');
const jwt = require('jsonwebtoken');

const middlewareFunction = async  function (req, res, next) {
    console.log(req.headers.token);
    let jwtEncode = 'test'
    console.log(jwtEncode);
    if(jwtEncode){
      console.log(jwtEncode);
        // console.log(jwtEncode);
        await Login.findOne({_id: jwtEncode.id})
        .then(function(us){
            console.log(us);
            next();
        }) 
        .catch(function(err){
            console.log(err);
            res.send('User is not authorized')
        })
        // console.log( res);
        // if (isAuthenticated && userOne.username){
        //     next();
        // }
        // else res.send('User is not authorized')
    } else {
        const { username, password } = req.body;
            const conditate = await Login.findOne({username})
            if(conditate) {
                return res.status(400).json({message: "Such user exists"});
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new Login({username, password: hashPassword});
            await user.save()
            return res.json({message: "User created "})
    }
  };


  module.exports = middlewareFunction;