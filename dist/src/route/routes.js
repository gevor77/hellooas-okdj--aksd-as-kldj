import Router from 'express';
import controller from '../controller/authController.js';
import postConntrol from '../controller/postController.js';
import commController from '../controller/commentController.js';
import middleware from '../middleware/middleware.js';
// eslint-disable-next-line new-cap
const router = Router();
router.post('/api/registration', controller.registration);
router.post('/api/login', controller.login);
router.post('/api/logout', middleware, controller.logout);
router.get('/api/users', middleware, controller.getUsers);
router.post('/api/add-comment/:postId', middleware, commController.addComment);
router.get('/api/reply-comment/:commentId', middleware, commController.replyComment);
router.post('/api/add-post', middleware, postConntrol.createNewPost);
router.post('/api/edit-post/:id', middleware, postConntrol.postEdit);
router.post('/api/like-post/:id', middleware, postConntrol.postLike);
router.get('/api/posts', middleware, postConntrol.getAllPost);
export default router;
