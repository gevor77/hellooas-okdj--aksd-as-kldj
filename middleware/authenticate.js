const jwt = require('jsonwebtoken');
const Session = require('../model/Session');

const authenticate = async function(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(req.headers.authorization);
      const decode = jwt.decode(token);
      const newSession = await Session.findOne({uuId: decode.sessionId});
      if(newSession) {
        next()
      } else {
        res.send("Plese Try Again");
      }
    } catch (err) {
      res.sendStatus(401);
    }
  }
  module.exports = authenticate;