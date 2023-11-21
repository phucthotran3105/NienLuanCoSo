import User from '../models/user.model.js';

const userController = {
    //[GET] /api/user
    getAllUser: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //[DELETE] /api/user
    deleteUser: async(req, res) => {
        //const {id} = req.body;
        try {
            User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete Successfully!!!");
        }catch(err) {
            res.status(500).json(err);
        }
    }, 

    async getOneUser(req, res) {
        try {
            const user = await User.findById(req.user.id).populate('cart')
            res.status(200).json(user)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
};

export default userController;