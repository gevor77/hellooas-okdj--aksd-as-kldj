const Router = require('express');
const mongoose = require('mongoose');
const router = Router();
const controller = require('../controller/authController');
const postConntrol = require('../controller/postController');
const commController = require('../controller/commentController');
const middleware = require('../middleware/middleware');
const authenticate = require('../middleware/authenticate');

router.post('/api/registration', controller.registration);
router.post('/api/login',  controller.login);
router.get('/api/users',authenticate, controller.getUsers);
router.post('/api/logout',middleware, controller.logout);
router.post('/api/add-comment/:postId',authenticate, commController.addComment);
router.get('/api/comments',authenticate, commController.replyComment);
router.post('/api/add-post',authenticate, postConntrol.createNewPost);
router.post('/api/edit-post/:id', postConntrol.postEdit);
router.post('/api/like-post/:id',authenticate, postConntrol.postLike);
router.get('/api/posts', authenticate, postConntrol.getAllPost);


module.exports = router;