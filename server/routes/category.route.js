import {Router} from 'express'
import { AddCategory, deleteCategory, getCategory, updateCategory } from '../controller/category.controller.js'
import auth from '../middleware/authToken.js'


export const categoryRouter = Router()

categoryRouter.post('/add-category',auth,AddCategory)
categoryRouter.get('/get',getCategory)
categoryRouter.put('/update',auth,updateCategory)
categoryRouter.delete('/delete',auth,deleteCategory)