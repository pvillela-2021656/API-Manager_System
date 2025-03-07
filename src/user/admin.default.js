import { hash } from "argon2";
import User from "./user.model.js";

export const adminDefault = async () => {
    try {

        const existingAdmin = await User.findOne({ email: "ADMINDEFAULT@kinal.edu.gt" });
        if (existingAdmin) {
            console.log("Admin has already been created");
            return;
        }
            await User.create({
                name: "PANCHO",
                surname: "VILLA",
                username: "ADMINDEFAULT",
                email: "ADMINDEFAULT@kinal.edu.gt",
                password: await hash("Roland#4"),
                profilePicture: "pvillela-1740959974663.jpg",
                phone: "99021324",
                role: "ADMIN_ROLE"
            });
            
        console.log("Default admin created");

    } catch (err) {
        console.log("Error creating user");
    }
};