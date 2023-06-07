const jwt = require('jsonwebtoken');
const Post = require('../model/Post');
const Session = require('../model/Session');
var ObjectId = require('mongoose').Types.ObjectId;
class PostController {

    async createNewPost (req,res) {
        try {
            const {userId} = req;
            console.log(userId);
            const { name, description  } = req.body;
            const post = new Post({name, description, userId })
            await post.save();
            return res.json({message: "Post added "})
        } catch (e) {
            res.status(400).json({message: `Login error ${e}`})            
        }
    }
    async postEdit(req, res) {
        try {
            const {userId} = req;
            const requesteId = req.params.id;
            const post = await Post.findOne({_id: req.params.id});
            if(post.userId === userId){
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
    async postLike (req, res, next) {
        try {
            const requesteId = req.params.id;
            const {userId} = req;
            const post = await Post.findOne( {_id: new ObjectId(req.params.id) });
            console.log(post);
            if(post) {
                console.log('create new like');
                await post.push({ user_id:userId, status:req.body.status});
                console.log(post, userId);
                return res.json(post);
            } else {
                console.log('hello post');
            }
        } catch (err) {
            res.send(`Error ${err}`)
        }
    }
}


module.exports = new PostController;