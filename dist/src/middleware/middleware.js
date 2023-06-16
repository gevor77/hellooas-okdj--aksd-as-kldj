import jwt from 'jsonwebtoken';
import Session from '../model/Session.js';
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.decode(token);
        const newSession = await Session.findOne({ uuId: decode.sessionId });
        req.userId = decode.id;
        if (newSession) {
            req.session = newSession;
            next();
        }
        else {
            res.send('Plese Try Again');
        }
    }
    catch (err) {
        res.sendStatus(401);
    }
};
export default authenticate;
