import express from 'express';
import DanhMucController from '../controllers/DanhMuc.controller.js';
import middlewareController from '../controllers/middleware.controller.js';

///api/danhmuc
const router = express.Router();
router.post('/add', middlewareController.verifyTokenAndAdminAuthPOST, DanhMucController.addDanhMuc);
router.put('/update/:id', DanhMucController.updateDanhMuc);
router.delete('/delete/:id', DanhMucController.deleteDanhMuc);
router.get('/stored',DanhMucController.getAllDanhMuc);

export default router;
