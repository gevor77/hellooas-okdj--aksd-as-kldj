import {Request, Response} from 'express';

// type NewCommentType = {
// 	comment: string;
// 	auther: string;
// 	post_id:string;
// 	replyComment:[];
// 	Date: Date;
// }

type ResponseAddComment = Response&{
    status(num:number),
    json(message: string)
}
type RequestAddComment = Request&{
    userId: string;
    params:{postId:string};
    body:{comment: string}
}
type RequestReplyComment = Request&{
    params:{commentId:string},
    body:{replyComment: string}
}
type ResponseReplyComment = Response&{
    status(num:number),
    json(message: string)
}
export type {
	RequestAddComment,
	ResponseAddComment,
	RequestReplyComment,
	ResponseReplyComment,
};
