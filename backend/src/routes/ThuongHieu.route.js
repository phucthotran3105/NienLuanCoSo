import express from 'express';
import ThuongHieuController from '../controllers/ThuongHieu.controller.js';
import middlewareController from '../controllers/middleware.controller.js';

const router = express.Router();
///api/thuonghieu
router.post('/add', middlewareController.verifyTokenAndAdminAuthPOST ,ThuongHieuController.addThuongHieu);
router.put('/update/:id',ThuongHieuController.updateThuongHieu);
router.delete('/delete/:id', ThuongHieuController.deleteThuongHieu);
router.get('/stored',ThuongHieuController.getAllThuongHieu);

export default router;
