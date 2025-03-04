import Category from "../category/category.model.js";
import Product from "./product.model.js";

export const newProduct = async (req, res) => {
    try {
        const data = req.body;
        const category = await Category.findOne({ category: data.category })
        if(!category){
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