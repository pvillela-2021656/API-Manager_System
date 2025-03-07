import Category from "./category.model.js";

export const categoryDefault = async () => {
    try {
        const existingCategory = await Category.findOne({ categoryName: "defaultCategory" })
            if (existingCategory) {
                console.log("Category has already been created");
                return;
            }
            await Category.create({
                categoryName: "defaultCategory",
                categoryDescription: "Categoria default."
        })
        console.log("Default category created.")
    }catch(err){
        console.log("Error creating default category.")
    }
}