import ThuongHieuModel from '../models/thuonghieu.js'; // Đảm bảo bạn đã import DanhMucModel từ tệp DanhMucModel.js
import PictureModel from '../models/Product.js';
// Hàm tạo danh mục sản phẩm mới
const ThuongHieuController = {
    addThuongHieu: async (req, res) => {
        try {

            const thuonghieu = await ThuongHieuModel.findOne({ nameTH: req.body.product.nameTH })
            if (!thuonghieu) {
                const newThuongHieu = await ThuongHieuModel.create(req.body.product);
                res.status(201).json(newThuongHieu);
            }
            else {
                return res.status(400).json({
                    mes: 'Đã tồn tại thương hiệu này'
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateThuongHieu: async (req, res) => {
        try {
            const thuonghieu = await ThuongHieuModel.findOneAndUpdate({ _id: req.params.id }, req.body)
            res.status(200).json(thuonghieu);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    deleteThuongHieu: async (req, res) => {
        try {
            const TH = await ThuongHieuModel.findById(req.params.id)
            for (let index = 0; index < TH.idProduct.length; index++) {
                console.log(TH.idProduct[index]);
                await PictureModel.findByIdAndDelete(TH.idProduct[index])
            }
            const thuonghieu = await ThuongHieuModel.findByIdAndDelete(req.params.id);
            res.status(200).json(thuonghieu);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllThuongHieu: async (req, res) => {
        try {
            const all = await ThuongHieuModel.find();
            return res.status(200).json(all);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
export default ThuongHieuController;