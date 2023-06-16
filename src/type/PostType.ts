import {Request, Response} from 'express';

// type PostType = {
// 	name: string,
// 	description: string,
// 	userId:string
// }
// export default PostType;
type RequestNewPost = Request & {
    userId: string,
    body: {
        name: string,
        description: string
    }
}
type ResponseAll = Response & {
    status(num:number),
    json(message: string)
}
type RequestPostLike = Request & {
    userId: string,
    params:{
        id:string,
    }
}
type RequestPostEdit = Request & {
    userId: string,
    params:{
        id:string,
    }
    body: {
        name: string,
        description: string
    }
}

export type {
	RequestNewPost,
	ResponseAll,
	RequestPostEdit,
	RequestPostLike,
};
