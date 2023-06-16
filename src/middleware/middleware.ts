import jwt from 'jsonwebtoken';
import Session from '../model/Session.js';
import DecodeTypes from '../type/DecodeType';
import SessionType from '../type/SessionType';

const authenticate = async (req, res, next) => {
	try {
		const token: string = req.headers.authorization.split(' ')[1];
		const decode: DecodeTypes = jwt.decode(token) as DecodeTypes;
		const newSession: SessionType = await Session.findOne({uuId: decode.sessionId}) as SessionType;
		req.userId = decode.id;
		if (newSession) {
			req.session = newSession;
			next();
		} else {
			res.send('Plese Try Again');
		}
	} catch (err) {
		res.sendStatus(401);
	}
};
export default authenticate;
