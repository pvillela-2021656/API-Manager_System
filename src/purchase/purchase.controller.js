import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import Product from "../product/product.model.js";
import Purchase from "./purchase.model.js";

// Agregar un producto al carrito
export const newCartRequest = async (req, res) => {
    const { productName, amount } = req.body;
    const user = req.params.user;

    try {
        const product = await Product.findOne({ productName: productName });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }
        if (product.productStock === 0) {
            return res.status(400).json({
                success: false,
                message: `Product ${productName} is out of stock.`
            });
        }
        if (amount > product.productStock) {
            return res.status(400).json({
                success: false,
                message: `Not enough stock for the product ${productName}.`
            });
        }
        let purchase = await Purchase.findOne({ user: user, status: "PEND" });

        if (!purchase) {
            purchase = new Purchase({
                user: user,
                product: [],
                status: "PEND"
            });
        }
        const existingProduct = purchase.product.find(item => item.product.toString() === product._id.toString());

        if (existingProduct) {
            existingProduct.amount += amount;
        } else {
            purchase.product.push({
                product: product._id,
                amount: amount
            });
        }
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
export const completeCartRequest = async (req, res) => {
    const { user } = req.params;

    try {
        //BUSCAR CARRITO CON ESTADO PEND
        const cart = await Purchase.findOne({ user: user, status: "PEND" }).populate("product.product");

        if (!cart || cart.product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No items in cart for this user."
            });
        }
        const createdAt = new Date(); //PARA GENERAR NOMBRE UNICO:
        const formattedDate = createdAt.toISOString().replace(/[-:T]/g, "").split(".")[0]; // YYYYMMDDHHmmss
        const billFileName = `bill_${user}_${formattedDate}.pdf`;

        const billPath = path.join(process.cwd(), "public/uploads/bills", billFileName);

        const dir = path.dirname(billPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(billPath));
        doc.fontSize(16).text(`Bill for User ID: ${user}`, { align: "center" }).moveDown(1);
        doc.fontSize(12).text(`Date: ${createdAt.toLocaleString()}`, { align: "left" }).moveDown(1);

        let total = 0;

        for (let item of cart.product) {
            const product = await Product.findById(item.product._id);

            if (!product) {
                console.warn(`Product not found: ${item.product._id}`);
                continue;
            }

            const price = product.productPrice || 0;
            const quantity = item.amount || 0;
            const totalPrice = price * quantity;
            total += totalPrice;

            doc.text(`Product: ${product.productName}`, {align: "left"});
            doc.text(`Amount: ${quantity}`, {align: "left"});
            doc.text(`Price: $${price.toFixed(2)}`,{align: "left"});
            doc.text(`Total: $${totalPrice.toFixed(2)}`, {align: "left"}).moveDown(0.5);

            product.productStock = Math.max(0, product.productStock - quantity);
            product.productSales += quantity;
            await product.save();
        }

        doc.text(`Total amount: $${total.toFixed(2)}`, { align: "right" }).moveDown(1);
        doc.end();
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
            return { success: true, history };
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "There was an error at getting the list of purchases.",
            error: err.message
    })
    }
}

