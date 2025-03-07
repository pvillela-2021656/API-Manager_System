import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { categoryDefault } from "./src/category/category.default.js"
import { adminDefault } from "./src/user/admin.default.js"

config()
initServer()
adminDefault()
categoryDefault()
