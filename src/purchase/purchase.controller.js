import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import Product from "../product/product.model.js";
import Purchase from "./purchase.model.js";

// Agregar un producto al carrito
export const newCartRequest = async (req, res) => {
    const { productName, amount } = req.body;
    const user = req.params.user; // El ID del usuario se pasa como parámetro

    try {
        // Verificar si el producto existe
        const product = await Product.findOne({ productName: productName });
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

        // Buscar si el usuario ya tiene un carrito activo
        let purchase = await Purchase.findOne({ user: user, status: "PEND" });

        if (!purchase) {
            purchase = new Purchase({
                user: user,
                product: [],
                status: "PEND"
            });
        }

        // Verificar si el producto ya está en el carrito
        const existingProduct = purchase.product.find(item => item.product.toString() === product._id.toString());

        if (existingProduct) {
            // Si el producto ya está en el carrito, sumamos la cantidad
            existingProduct.amount += amount;
        } else {
            // Si no está, lo agregamos
            purchase.product.push({
                product: product._id,
                amount: amount
            });
        }

        // Guardar el carrito con los cambios
        const updatedPurchase = await purchase.save();

        return res.status(201).json({
            success: true,
            message: "Product added to the cart.",
            purchase: updatedPurchase
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error adding product to the cart.",
            error: err.message
        });
    }
};

// CREAR FACTURA

// CREAR FACTURA
export const completeCartRequest = async (req, res) => {
    const { user } = req.params;

    try {
        // Buscar el carrito de compras con estado "PEND" y poblar productos
        const cart = await Purchase.findOne({ user: user, status: "PEND" }).populate("product.product");

        if (!cart || cart.product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No items in cart for this user."
            });
        }

        // Generar la fecha especial en formato YYYYMMDD_HHmmss
        const createdAt = new Date();
        const formattedDate = createdAt.toISOString().replace(/[-:T]/g, "").split(".")[0]; // YYYYMMDDHHmmss

        // Crear el nombre único del archivo con la fecha
        const billFileName = `bill_${user}_${formattedDate}.pdf`;

        // Ruta de almacenamiento de facturas
        const billPath = path.join(process.cwd(), "public/uploads/bills", billFileName);

        // Crear directorio si no existe
        const dir = path.dirname(billPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Crear documento PDF
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(billPath));

        // Encabezado de la factura
        doc.fontSize(16).text(`Bill for User ID: ${user}`, { align: "center" }).moveDown(1);
        doc.fontSize(12).text(`Date: ${createdAt.toLocaleString()}`, { align: "left" }).moveDown(1);

        let total = 0;

        // Iterar sobre los productos en el carrito y generar el PDF
        for (let item of cart.product) {
            const product = await Product.findById(item.product._id);

            if (!product) {
                console.warn(`Product not found: ${item.product._id}`);
                continue;
            }

            // Cálculo seguro del precio total del producto
            const price = product.productPrice || 0;
            const quantity = item.amount || 0;
            const totalPrice = price * quantity;
            total += totalPrice;

            // Escribir detalles del producto en el PDF
            doc.text(`Product: ${product.productName}`, { align: "left" });
            doc.text(`Amount: ${quantity}`, { align: "left" });
            doc.text(`Price: $${price.toFixed(2)}`, { align: "left" });
            doc.text(`Total: $${totalPrice.toFixed(2)}`, { align: "left" }).moveDown(0.5);

            // Actualizar stock y ventas del producto
            product.productStock = Math.max(0, product.productStock - quantity);
            product.productSales += quantity;
            await product.save();
        }

        // Total final en el PDF
        doc.text(`Total amount: $${total.toFixed(2)}`, { align: "right" }).moveDown(1);
        doc.end();

        // Marcar la compra como finalizada y guardar la fecha
        cart.status = "DONE";
        cart.createdAt = createdAt;
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Bill generated successfully.",
            billPath,
            createdAt
        });

    } catch (err) {
        console.error("Error processing bill:", err);
        return res.status(500).json({
            success: false,
            message: "Could not finish the bill successfully.",
            error: err.message
        });
    }
};

export const purchaseHistory = async (req, res) => {
    const { user } = req.params
    try{
        const history = await Purchase.find({user: user, status: "DONE"})
            .populate("product.product", "productName productPrice")
            .sort({ createdAt: -1});

            if(history.length === 0){
                return res.status(404).json({
                    success: false,
                    message: "Couldnt find any purchases from this user."
                })
            }
            return res.status(200).json({
                success: true,
                history
            })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "There was an error at getting the list of purchases.",
            error: err.message
    })
    }
}