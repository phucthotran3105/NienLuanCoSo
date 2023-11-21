import mongoose from 'mongoose';

const DanhMucSchema = new mongoose.Schema(
    {
        nameDM: { type: String, required: true },
        idProduct: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    },

    { timestamps: true },

    { collection: 'Categories' }
)

const DanhMucModel = mongoose.model('Categories', DanhMucSchema);

export default DanhMucModel;