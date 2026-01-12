import express from 'express'
import {authorizeRoles} from '../middleware/roleMiddleware.js'
import { createTask,getTasks,updateTask,deleteTask } from '../controllers/taskControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/',verifyToken,createTask);
router.get('/',verifyToken,getTasks);
router.put('/:id' ,verifyToken,updateTask);
router.delete('/:id',verifyToken,authorizeRoles("admin"),deleteTask);



export default router;