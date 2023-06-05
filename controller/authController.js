const Login = require('../model/Login');
const Session = require('../model/Session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const secretToken = "SECRET TOKEN";
const activeSessions = {};

const generateAccsessToken = (sessionId,id) => {
    return jwt.sign({sessionId, id}, secretToken, {expiresIn:"20m"})
}
function verifyToken(token) {
    return jwt.verify(token, secretToken);
  }
class AuthController {
    async registration (req, res) {
        try {
            const { username, password } = req.body;
            const conditate = await Login.findOne({username})
            if(conditate) {
                return res.status(400).json({message: "Such user exists"});
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new Login({username, password: hashPassword});
            await user.save()
            return res.json({message: "User created "})
        } catch (e) {
            res.status(400).json({message: `Login error ${e}`})
        }
    }

    async login (req, res) {
        try {
            const { username, password } = req.body;
            const user = await Login.findOne({username});
            const sessionId = uuid.v4();
            if(!user) {
                return res.status(400).json({message: `no such  ${username} user exists`})
            }
            const validPass = bcrypt.compareSync(password, user.password);
            if(!validPass){
                res.status(400).json({message: "Login error different pass"})
            }
            await Session.deleteMany({userID: user._id});
            const newSession = new Session({userID: user._id, uuId: sessionId});
            await newSession.save()
            const token = generateAccsessToken(sessionId, user._id)
            activeSessions[sessionId] = {user: user}
            res.json({ token, sessionId})
        } catch (e) {
            res.status(400).json({message: `Login error ${e}`})
        }
    }

    async getUsers(req,res) {
        try {
            const users = await Login.find()
            res.json(users)
        } catch (e) {
            res.status(400).json({message: `Get users error ${e}`})
        }
    }

    async logout(req,res) {
        const token =  req.headers.authorization.split(' ')[1];
        console.log(activeSessions);
        try {
            const decode = verifyToken(token)
            const sessionId = decode.sessionId;
            delete activeSessions[sessionId]
            res.status(200);
        } catch (err) {
            res.sendStatus(401)
        }
    }
}


module.exports = new AuthController;