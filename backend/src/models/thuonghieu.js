import mongoose from 'mongoose';

const ThuongHieuSchema = new mongoose.Schema(
    {
        nameTH: { type: String, required: true },
        idProduct: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    },

    { timestamps: true },

    { collection: 'Brand' }
)

const ThuongHieuModel = mongoose.model('Brand', ThuongHieuSchema);

export default ThuongHieuModel;