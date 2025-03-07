import Category from "../category/category.model.js";
import Product from "./product.model.js";

export const newProduct = async (req, res) => {
    try {
        const data = req.body;
        const category = await Category.findOne({ category: data.category })
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const product = new Product({
            ...data,
            category: category._id
        });

        await product.save();
        res.status(200).json({
            success: true,
            message: "|New product added successfully|",
            product
        });
    } catch (err) {
        res.status(500).json({
            scucess: false,
            message: "There was a mistake in the making of this product.",
            error: err.message
        })
    }
}

export const listProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            message: "Here are all the products in the DB:",
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "There was an error while trying to find all products.",
            error: err.message
        });
    }
}

export const listOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id);

        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Couldnt find the specific product.",
            error: err.message
        });
    }
}

export const findOutOfStock = async (req, res) => {
    try {
        const outOfStock = await Product.find({ productStock: 0 });
        res.status(200).json({
            success: true,
            message: "Out of stock products.",
            outOfStock
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Couldnt find the out of stock products.",
            error: err.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Couldnt update the product.",
            error: err.message
        });
    }
}

export const mostSelled = async (req, res) => {
    try {
        const mostSelled = await Product.find({ productSales: { $gt: 0 } })
        .sort({ productSales: -1 });

        //SI NO SE ENCUENTRA NINGUN PRODUCTO CON UN PRODUCTSALES MAYOR A 0, DA:
        if (mostSelled.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No sales found greater than zero.",
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Here are all the most selled products based on our DB.",
            mostSelled
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "There was an error at trying to find the most selled products.",
            error: err.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params
        const deleteProduct = await Product.findById(id);
        //Tratar de encontrrar el producto.
        if(!deleteProduct){
            return res.status(404).json({
                success: false,
                message: "Couldnt find the product to delete."
            });
        }

        res.status(200).json({
            success: true,
            message: "|Product successfully deleted|"
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Couldnt delete the product.",
            error: err.message
        });
    }
}