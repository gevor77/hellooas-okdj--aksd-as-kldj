import {Request, Response} from 'express';

type LoginType = {
	username: string,
	password: string,
	_id?: string,
}
type RequestLogin = Request &{
    body:{
        username:string,
        password:string
    }
}
type ResponseGetUsers = Response&{
    status(num:number),
    // eslint-disable-next-line no-empty-pattern
    json({})
}
type ResponseLogin = Response&{
    status(num:number),
    json({message, sessionId})
}
export type {
	LoginType,
	// RequestSession,
	RequestLogin,
	// ResponseRegister,
	ResponseLogin,
	ResponseGetUsers,
};
