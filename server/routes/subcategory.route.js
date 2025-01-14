import express from 'express';
 
import auth from '../middleware/authToken.js';
import { addSubCategory , getSubCategory , deleteSubCategory, updateSubCategory} from '../controller/subCategory.controller.js'


export const subCategoryRouter = express.Router(); 
subCategoryRouter.post('/create', auth, addSubCategory); 
subCategoryRouter.post('/get', getSubCategory); 
subCategoryRouter.put('/update', auth, updateSubCategory);
 subCategoryRouter.delete('/delete', auth, deleteSubCategory);