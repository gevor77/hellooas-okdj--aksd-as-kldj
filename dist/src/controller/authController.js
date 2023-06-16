import Login from '../model/Login.js';
import Session from '../model/Session.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
const secretToken = 'SECRET TOKEN';
const activeSessions = {};
const generateAccsessToken = (sessionId, id) => {
	return jwt.sign({sessionId,
		id}, secretToken, {expiresIn: '20m'});
};
class AuthController {
	// eslint-disable-next-line class-methods-use-this
	async registration(req, res) {
		try {
			const {username, password} = req.body;
			const conditate = await Login.findOne({username});
			if (conditate) {
				return res.status(400).json({message: 'Such user exists'});
			}
			const hashPassword = bcrypt.hashSync(password, 7);
			const user = new Login({username,
				password: hashPassword});
			await user.save();

			return res.json({message: 'User created '});
		} catch (e) {
			return res.status(400).json({message: `Login error ${e}`});
		}
	}
	// eslint-disable-next-line class-methods-use-this
	async login(req, res) {
		try {
			const {username, password} = req.body;
			const user = await Login.findOne({username});
			const sessionId = uuidv4();
			if (!user) {
				return res.status(400).json({message: `no such  ${username} user exists`});
			}
			const validPass = bcrypt.compareSync(password, user.password);
			if (!validPass) {
				return res.status(400).json({message: 'Login error different pass'});
			}
			// eslint-disable-next-line no-underscore-dangle
			await Session.deleteMany({userID: user._id});
			// eslint-disable-next-line no-underscore-dangle
			const newSession = new Session({userID: user._id,
				uuId: sessionId});
			await newSession.save();
			// eslint-disable-next-line no-underscore-dangle
			const message = generateAccsessToken(sessionId, user._id);
			activeSessions[sessionId] = {user};

			return res.json({message,
				sessionId});
		} catch (e) {
			return res.status(400).json({message: `Login error ${e}`});
		}
	}
	// eslint-disable-next-line class-methods-use-this
	async getUsers(req, res) {
		try {
			const users = await Login.find();

			return res.json(users);
		} catch (e) {
			return res.status(400).json({message: `Get users error ${e}`});
		}
	}
	// eslint-disable-next-line class-methods-use-this
	async logout(req, res) {
		try {
			await Session.findOneAndDelete({uuId: req.session.uuId});

			return res.status(200).json({message: 'Logout'});
		} catch (err) {
			return res.status(401);
		}
	}
}
export default new AuthController();
