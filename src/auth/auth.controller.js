import { hash, verify } from "argon2";
import { generateJWT } from "../helpers/generate-jwt.js";
import User from "../user/user.model.js";
import { purchaseHistory } from "../purchase/purchase.controller.js"
import Purchase from "../purchase/purchase.model.js"

export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}

//login de ADMIN
export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ username: username }, { password: password }]
        });

        if (!user) {
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            });
        }

        if (user.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                message: "Acceso denegado",
                error: "Solo los administradores pueden iniciar sesión aquí"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(user.id);
        const history = await Purchase.find({ user: user.id, status: "DONE" })
            .populate("product.product", "productName productPrice")
            .sort({ createdAt: -1 })

        const purchaseHistory = history.length ? history : "No purchases yet."

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture,
                role: user.role,
                purchaseHistory: purchaseHistory
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};


//Login de CLIENT
export const loginClient = async (req, res) => {
    const { username, password } = req.body;  

    try {
        const user = await User.findOne({
            $or: [{ username: username }, { email: username }] 
        });

        if (!user) {
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            });
        }

        if (user.role !== "CLIENT_ROLE") {
            return res.status(403).json({
                message: "Acceso denegado",
                error: "Solo los clientes pueden iniciar sesión aquí"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(user.id);

        const history = await Purchase.find({ user: user.id, status: "DONE" })
            .populate("product.product", "productName productPrice")
            .sort({ createdAt: -1 });

        const purchaseHistory = history.length ? history : "No purchases yet."

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture,
                role: user.role,
                purchaseHistory: purchaseHistory
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};
