import Router from 'express'
const router = new Router();
import itemController from "../controllers/item.controller.js";
import {protect} from '../middleware/auth.js';

router.route('/')
    .get(protect, itemController.getAll)
    .post(protect, itemController.set);

/*router.get('/', itemControllerController.getAll);
router.post('/', itemControllerController.set);*/

router.route('/:id')
    .get(protect, itemController.get)
    .put(protect, itemController.update)
    .delete(protect, itemController.remove);

/*router.get('/:id', itemControllerController.get);
router.put('/:id', itemControllerController.update);
router.delete('/:id', itemControllerController.remove);*/

export default router;