import User from "./user.model.js";
//FUNCIONALIDAD DE ACTUALIZAR EL ROL DEL USUARIO
export const updateRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        if (data.role && !["ADMIN_ROLE", "CLIENT_ROLE"].includes(data.role)) {
            return res.status(500).json({
                success: false,
                message: "Error, only ADMIN_ROLE or CLIENT_ROLE are allowed."
            });
        }

        const updateUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'User updated.',
            user: updateUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error at updating the User.',
            error: err.message
        });
    }
};

//FUNCIONALIDAD, ELIMINAR USUARIO SOLO SI ES CLIENT_ROLE
export const deleteUserClientRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const usuarios = await User.findById(uid);

        if (usuarios.role !== "CLIENT_ROLE") {
            return res.status(403).json({
                success: false,
                message: "You can ONLY delete users with the role CLIENT_ROLE."
            });
        }

        await User.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "User successfully deleted."
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "There was a mistake in the deleting of this user.",
            error: err.message
        });
    }
};

//FUNCIONALIDAD, ELI
export const updateOnlyClient = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const usuarios = await User.findById(uid);

        if (usuarios.role !== "CLIENT_ROLE") {
            return res.status(403).json({
                success: false,
                message: 'You can ONLY edit users with the role CLIENT_ROLE.',
            });
        }

        const updateUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'User updated.',
            user: updateUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error at updating the User.',
            error: err.message,
        });
    }
};