import { config } from "dotenv"
import { initServer } from "./configs/server.js"
import { categoryDefault } from "./src/category/category.default.js"

config()
initServer()
categoryDefault()