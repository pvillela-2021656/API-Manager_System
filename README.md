# API-Store_Manager
Proyecto Bimestral I Pablo Villela
Hecho para la gestión de productos, usuarios y generación de facturas profesionales para cualquier empresa

## Prerrequisitos
[Git](https://git-scm.com/)
[NodeJS](https://nodejs.org/en)
[MongoDB](https://www.mongodb.com/)
[Postman](https://www.postman.com/)

## Instalación:
1. **Crea una carpeta en tu computadora** (De preferencia separada de otras para mejor reconocimiento)
2. **Abrir el CMD de tu carpeta nueva en la barra de direcciónes**
3. **Coloca en el CMD de tu carpeta el link de esta API** (https://github.com/pvillela-2021656/Proyecto-BIM-I.git)
```cmd
git clone https://github.com/pvillela-2021656/Proyecto-BIM-I.git
```
4.**Despues de que se termine de clonar el repositorio, muevete a la nueva carpeta**
```cmd
   cd nombre-carpeta
```
5.**Ya dentro de el repositorio clonado, haz un npm i para terminar de instalar las dependencias que lleva la API**
```cmd
   npm i
```
6.**Despues del npm i, haz un <code .>para poder entrar a VisualCode**
```cmd
   code .
```
7.**Para terminar el proceso, iniciar el servidor para poder empezar a manejar la API**
```cmd
   npm run dev
```
8.**Listo! Ya estas listo para usar esta API libremente.**

## Usar la API
Para el uso sencillo de los clientes que usen esta API, se ha creado un administrador por default cada que se inicia el servidor, es libre de usar este admin para cualquier otra función o crear uno diferente. Tendra para usar la creación de usuarios, categorias, productos, compras no confirmadas y facturas automaticas en formato PDF.

## USUARIOS:

**LOGIN ADMIN**
```bash
(POST) http://127.0.0.1:3006/managerSystem/v1/auth/loginAdmin
```
*Body: raw, json*
```cmd
{
    "username": "PVILLELA",
    "password": "Roland#1"
}
```

**UPDATE USER ROLE**
```bash
(PATCH) (http://127.0.0.1:3006/managerSystem/v1/user/updateRole/user)
```
*Body: raw, json*
*BearerToken: loginAdmin*
```cmd
{
    "role": "ADMIN_ROLE" o "CLIENT_ROLE"
}
```

**UPDATE ONLY CLIENT ROLE**
```bash
(PATCH) (http://localhost:3006/managerSystem/v1/user/updateOnlyClientRole/user)
```
*Body: raw, json*
*BearerToken: loginAdmin, loginClient*
```cmd
{
    "name": "text",
    "surname": "text",
    "username": "text",
    "email": "text",
    "password": "text",
    "profilePicture": "file",
    "phone": "########",
    "role": "CLIENT_ROLE" o "ADMIN_ROLE"
}
```

**DELETE USER BY CLIENT**
```bash
(DELETE) http://localhost:3006/managerSystem/v1/user/deleteUserByClientRole/user
```
*BearerToken: loginAdmin*

## CATEGORY:

**NEW CATEGORY**
```bash
(POST) http://localhost:3006/managerSystem/v1/category/newCategory
```
*Body: raw, json*
*BearerToken: loginAdmin*
```cmd
{
    "categoryName": "text",
    "categoryDescription": "text"
}
```

**UPDATE CATEGORY**
```bash
(POST) http://localhost:3006/managerSystem/v1/category/updateCategory/category
```
*Body: raw, json*
*BearerToken: loginAdmin*
```cmd
{
    "categoryName": "newText",
    "categoryDescription": "newText"
}
```

**LIST CATEGORY**
```bash
(GET) http://localhost:3006/managerSystem/v1/category/listCategory
```
*BearerToken: loginAdmin*

**DELETE CATEGORY**
```bash
(DELETE) http://localhost:3006/managerSystem/v1/category/deleteCategory/category
```
*BearerToken: loginAdmin*

## PRODUCT:

**NEW PRODUCT**
```bash
(POST) http://localhost:3006/managerSystem/v1/product/newProduct
```
*Body: raw, json*
*Bearer Token: LoginAdmin*
```cmd
{
    "productName": "text",
    "productCategory": "category",
    "productDescription": "text.",
    "productSales": "#",
    "productPrice": "#",
    "productStock": "#"
}
```

**LIST PRODUCTS**
```bash
(GET) http://localhost:3006/managerSystem/v1/product/listProduct
```
*Bearer Token: LoginAdmin, loginClient*

**LIST ONE PRODUCT**
```bash
(GET) http://localhost:3006/managerSystem/v1/product/listOneProduct/product
```
*Bearer Token: LoginAdmin, loginClient*

**PRODUCTS WITH NO STOCK**
```bash
(GET) http://localhost:3006/managerSystem/v1/product/noStock
```
*Bearer Token: LoginAdmin, loginClient*

**MOST SELLED PRODUCTS**
```bash
(GET) http://localhost:3006/managerSystem/v1/product/mostSelled
```
*Bearer Token: LoginAdmin, loginClient*

**UPDATE PRODUCT**
```bash
(PUT) http://localhost:3006/managerSystem/v1/product/updateProduct/product
```
*Body: raw, json*
*Bearer Token: LoginAdmin*
```cmd
{
    "productName": "newText",
    "productCategory": "category",
    "productDescription": "newText.",
    "productSales": "#",
    "productPrice": "#",
    "productStock": "#"
}
```

**DELETE PRODUCT**
```bash
(DELETE) http://localhost:3006/managerSystem/v1/product/deleteProduct/product
```
*BearerToken: loginAdmin*

Generar carritos de compras, facturas en PDF y historial de compras:
## PURCHASE:

**CART REQUEST**
```bash
(POST) http://localhost:3006/managerSystem/v1/purchase/newCartRequest/user
```
*Body: raw, json*
*Bearer Token: LoginAdmin, LoginClient*
```cmd
{
    "productName": productName",
    "amount": #
}
```

**CART CONFIRMATION**
```bash
(POST) http://localhost:3006/managerSystem/v1/purchase/bill/user
```
*Bearer Token: LoginAdmin, LoginClient*

**PURCHASE HISTORY**
```bash
(GET) http://localhost:3006/managerSystem/v1/purchase/userPurchaseHistory/user
```
*Bearer Token: LoginAdmin, LoginClient*

## Notas:
# Si llega a ver problemas al iniciar el servidor por problemas de el port usar:
```cmd
  set port=3006
```
### Cada una de las acciones en esta API REQUIERE de validación de JWT(Excepto los login), siempre usar los Token de admin o usuario dependiendo el uso.
### Si surgen dudas sobre las funcionalidades de esta API, todo se encuentra en el archivo de endpoints "Proyecto-BIM1-PV.postman_collection.json"
### Cualquier otro error contactar a:
```bash
pvillela-2021656@kinal.edu.gt
```
