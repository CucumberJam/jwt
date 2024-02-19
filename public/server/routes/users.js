import Router from 'express'
const router = new Router();
import userController from "../controllers/user.controller.js";
import {protect} from '../middleware/auth.js';

router.get('/', userController.getAll); // доступен только для авторизованны пользователей
router.get('/me', protect, userController.get); // доступен только для авторизованны пользователей

router.post('/registration', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout); // удаляется refresh token из БД

router.get('/activate/:link',  userController.activate); // активация ссылки которая приходит на почту
router.get('/refresh',  userController.refresh); // перезапись access token (отправляем на сервер refresh получаем пару access и новый refresh)

export default router;