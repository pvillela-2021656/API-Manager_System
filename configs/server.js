"use strict"

import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import authRoutes from "../src/auth/auth.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import productRoutes from "../src/product/product.routes.js"
import purchaseRoutes from "../src/purchase/purchase.routes.js"
import userRoutes from "../src/user/user.routes.js"
import { dbConnection } from "./mongo.js"
import { swaggerDocs, swaggerUi } from "./swagger.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/managerSystem/v1/category", categoryRoutes)
    app.use("/managerSystem/v1/auth", authRoutes)   
    app.use("/managerSystem/v1/user", userRoutes)
    app.use("/managerSystem/v1/product", productRoutes)
    app.use("/managerSystem/v1/purchase", purchaseRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}