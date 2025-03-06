import Product from "../product/product.model.js";
import User from "../user/user.model.js";
import ShoppingCart from "./shoppingcart.model.js";

export const newCartRequest = async (req, res) => {
    const { productName, amount } = req.body;
    const userId = req.params.userId;  // El ID del usuario se pasa como parámetro

    try {
        // Verificar si el producto existe
        const product = await Product.findOne({ name: productName });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        // Verificar si el producto tiene stock
        if (product.productStock === 0) {
            return res.status(400).json({
                success: false,
                message: `Product ${productName} is out of stock.`
            });
        }

        // Verificar si hay suficiente stock
        if (amount > product.productStock) {
            return res.status(400).json({
                success: false,
                message: `Not enough stock for the product ${productName}.`
            });
        }

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Crear un nuevo carrito si no existe uno, sin comprobar si ya tiene carrito pendiente
        let shoppingCart = new ShoppingCart({
            user: userId,
            product: [],
            status: "PEND"
        });

        // Agregar el producto al carrito, sin verificar si ya existe
        shoppingCart.product.push({
            product: product._id,
            amount: amount
        });

        // Guardar el carrito con el nuevo producto
        const updatedCart = await shoppingCart.save();

        return res.status(201).json({
            success: true,
            message: "Product added to the cart.",
            cart: updatedCart
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error adding product to the cart.",
            error: err.message
        });
    }
};