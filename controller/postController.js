const jwt = require('jsonwebtoken');
const Post = require('../model/Post');
const Session = require('../model/Session');

function tokenFunction(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    return decode;
}
class PostController {

    async createNewPost (req,res) {
        try {
            const decode = tokenFunction(req);
            const { name, description  } = req.body;
            const post = new Post({name, description, userId: decode.id })
            await post.save();
            return res.json({message: "Post added "})
        } catch (e) {
            res.status(400).json({message: `Login error ${e}`})            
        }
    }
    async postEdit(req, res) {
        try {
            const requesteId = req.params.id;
            const decode = tokenFunction(req)
            const post = await Post.findOne({_id: req.params.id});
            if(post.userId === decode.id){
                await Post.findOneAndUpdate({_id: requesteId},{
                    $set: {
                        name: req.body.name,
                        description: req.body.description
                    }
                })
                return res.json({message: "Post updated "});
        } else {
            return res.json({message: "You can not updating this"});
        }
        } catch (err) {
            res.status(400).json({message: `Login error ${err}`})
        }
    }
    async getAllPost (req,res) {
        try {
            const posts = await Post.find();
            res.json(posts)
        } catch (e) {
            res.status(400).json({message: `Login error ${e}`})            
        }
    }
}


module.exports = new PostController;