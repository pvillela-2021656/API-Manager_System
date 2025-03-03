import User from "./user.model.js";

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'User updated.',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error at updating the User.',
            error: err.message
        });
    }
};