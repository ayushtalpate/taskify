import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js'
import { authorizeRoles } from '../middleware/roleMiddleware.js'
const router = express.Router()

//admin
router.get('/admin',verifyToken,authorizeRoles("admin"),(req,res) =>{
    res.json({success:true ,message:"welcome admin"})
})

//user
router.get('/user',verifyToken,authorizeRoles("admin","user"),(req,res) =>{
    res.json({success:true ,message:"welcome user"})
})

export default router;