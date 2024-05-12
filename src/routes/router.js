const Router = require('koa-router');
const {getAllUsers, getUserById, createUser, updateUser, patchUser, deleteUser} = require('../controllers/users');

const router = new Router();

router.get('/users',  getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.patch('/users/:id', patchUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
