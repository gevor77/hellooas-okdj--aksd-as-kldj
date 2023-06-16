import Post from '../model/Post.js';
class PostController {
    // eslint-disable-next-line class-methods-use-this
    async createNewPost(req, res) {
        try {
            const { userId } = req;
            const { name, description } = req.body;
            const post = new Post({ name,
                description,
                userId });
            await post.save();
            return res.json({ message: 'Post added ' });
        }
        catch (e) {
            return res.status(400).json({ message: `Login error ${e}` });
        }
    }
    // eslint-disable-next-line class-methods-use-this
    async postEdit(req, res) {
        try {
            const { userId } = req;
            const requesteId = req.params.id;
            const post = await Post.findOne({ _id: req.params.id });
            if (post.userId.toString() === userId) {
                await Post.findOneAndUpdate({ _id: requesteId }, {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                    },
                });
                return res.json({ message: 'Post updated ' });
            }
            return res.json({ message: 'You can not updating this' });
        }
        catch (err) {
            return res.status(400).json({ message: `Login error ${err}` });
        }
    }
    // eslint-disable-next-line class-methods-use-this
    async getAllPost(req, res) {
        try {
            const posts = await Post.find();
            res.json(posts);
        }
        catch (e) {
            res.status(400).json({ message: `Login error ${e}` });
        }
    }
    // eslint-disable-next-line class-methods-use-this
    async postLike(req, res) {
        try {
            const requesteId = req.params.id;
            const { userId } = req;
            const post = await Post.findOne({ _id: requesteId });
            if (post.postLikes.length) {
                await post.postLikes.push({ user_id: userId });
                post.save();
                return res.json(post);
            }
            const postAddNew = await Post.find({ '_id': requesteId,
                'postLikes.user_id': userId });
            if (postAddNew == null || postAddNew.length === 0) {
                await post.postLikes.push({ user_id: userId });
                post.save();
                return res.json(post);
            }
            return res.json({ message: 'Unlike' });
        }
        catch (err) {
            return res.send(`Error ${err}`);
        }
    }
}
export default new PostController();
