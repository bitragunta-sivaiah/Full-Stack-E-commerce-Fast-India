import express from 'express';
import { login, logout, refreshToken, register, updateUserDetails, uploadAvatar, userDetails } from '../controller/user.controller.js';
import auth from '../middleware/authToken.js';
import upload from '../middleware/multer.js'
export const authRouter = express.Router();

authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.get('/logout',auth,logout)
 authRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
 authRouter.put('/update-user',auth,updateUserDetails)
 authRouter.post('/refresh-token',refreshToken)
authRouter.get('/user-details',auth,userDetails)