import Category from "./category.model.js";

export const newCategory = async (req, res) => {
    try {
        const data = req.body;
        //Metodo de creación de category
        const category = new Category({
            ...data,
        });
        await category.save();
        //Resultado exitoso:
        res.status(200).json({
            success: true,
            message: "|New category added successfully|",
            category
        });
    } catch (err) {
        res.status(500).json({//Error interno del servidor
            scucess: false,
            message: "There was a mistake in the making of this category.",
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res ) => {
    try{
        const { id } = req.params
        await Category.findByIdAndUpdate(id, { status: false}, { new: true})
        //Categoría eliminada
        return res.status(200).json({
            success: true,
            message: "|Category successfully deleted|"
        })
    }catch(err){
        return res.status(500).json({//Error interno del servidor
            success: false,
            message: "There was a mistake in the deleting of this category.",
            error: err.message
        })
    }
}

export const listCategory = async (req, res) => {
    try{
        const categorylist = await Category.find();

        return res.status(200).json({
            success: true,
            message: "|Access to the list of categories granted|",
            categorylist
        })
    }catch(err) {
        res.status(500).json({
            success: false,//Error interno del servidor
            message: "Couldnt access the data of the categories.",
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body//Encontrar la categoría por su ID, ejemplo: 67af57648afa2a157aad2e1e
        const category = await Category.findByIdAndUpdate(id, data, { new:true });
        
        res.status(200).json({
            success: true,
            message: "|Category has been updated successfully|",
            name: category.categoryName, //Display de lo categoria ya actualiada
            description: category.categoryDescription


        })
    }catch(err) {
        res.status(500).json({
            success: false,//Error interno del servidor
            message: "There was a mistake in the update of this category.",
            error: err.message
        })
    }
}