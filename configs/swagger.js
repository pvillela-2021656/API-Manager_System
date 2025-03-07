import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Store and storage management API",
            version: "1.0.0",
            description: "API para sistema de productos y facturas con acceso para Users y Admins",
            contact:{
                name: "Pablo Villela",
                email: "pvillela-2021656@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://localhost:3006/managerSystem/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/category/category.routes.js",
        "./src/user/user.routes.js",
        "./src/purchase/purchase.routes.js",
        "./src/product/product.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }