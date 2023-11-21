import DanhMucModel from '../models/danhmuc.js'; // Đảm bảo bạn đã import DanhMucModel từ tệp DanhMucModel.js

// Hàm tạo danh mục sản phẩm mới
const DanhMucController = {
    addDanhMuc: async (req, res) => {
        try {
            const dmuc = await DanhMucModel.findOne({ nameDM: req.body.product.nameDM })
            if (dmuc) {
                return res.status(400).json({
                    mes: 'Đã tồn tại thương hiệu này'
                })
            }
            const danhmuc = await DanhMucModel.create(req.body.product)
            res.status(201).json(danhmuc);
        } catch (error) {
            res.status(500).json(err);
        }
    },

    updateDanhMuc: async (req, res) => {
        try {
            const danhmuc = await DanhMucModel.findOneAndUpdate({ _id: req.params.id }, req.body)
            res.status(200).json(danhmuc);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    deleteDanhMuc: async (req, res) => {
        try {
            const danhmuc = await DanhMucModel.findByIdAndDelete(req.params.id);
            res.status(200).json(danhmuc);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllDanhMuc: async (req, res) => {
        try {
            const all = await DanhMucModel.find();
            return res.status(200).json(all);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

}
export default DanhMucController;