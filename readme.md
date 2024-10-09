# Backend 3

Este proyecto toma como base la entrega final de Backend 1 y Backend 2 

## Desarrollo de Entrega Final Backend 1
Se desarrolló un Servidor Backend para un e-commerce con persistencia en MONGODB, el mismo posee los siguientes Endpoints:


- Products
	- //Devolver todos los Productos - GET
		http://localhost:8080/api/products/
	- // Devolver Producto por ID - GET
		http://localhost:8080/api/products/:pid
	- //Agregar Producto - POST
		http://localhost:8080/api/products/
	- //Actualizar Producto - PUT
		http://localhost:8080/api/products/:pid
	- //Borrar Producto - DELETE
		http://localhost:8080/api/products/:pid

- Carts
	- //Agregar Cart - POST
		http://localhost:8080/api/carts/
	- //Devolver Cart por ID
		http://localhost:8080/api/carts/:cid
	- //Agregar Producto por ID a Cart por ID
		http://localhost:8080/api/carts/:cid/products/:pid
	- //Borrar Productos de Cart especifico
		http://localhost:8080/api/carts/:cid/products/:pid
	- //Actualizar Cart por ID
		http://localhost:8080/api/carts/:cid
	- //Actualizar quantity de prod por Id y ID de cart
		http://localhost:8080/api/carts/:cid/products/:pid
	- //Borrar todos los Productos del Cart
		http://localhost:8080/api/carts/:cid


El proyecto se encuentra dividido en capas: 
- Server
- Routes
- Controllers
- Services
- DAOs

## Desarrollo de Entrega Final Backend 2
Tomando la base antes mencionada se agrega:
- Autenticacion y Autorizacion para los Endpoints que indica la entrega
- Uso de Estrategias con Passport
- Uso de Middlewares varios
- Uso de DTOs
- Uso de JsonWebToken
- Uso de Cookies
- Uso de Mailing (para el registro)


Ademas se agregan los siguientes Endpoints.

- Auth
	-  Registro de nuevos Usuarios
		localhost:8080/api/auth/register
	-  Login de Usuario
		localhost:8080/api/auth/login
	-  Logout de Usuario
		localhost:8080/api/auth/logout
	-  Current User
		localhost:8080/api/auth/current

- Cart
	-  Purchase
		localhost:8080/api/carts:cid/purchase



Se sube archivo.envTest para completar variables de entorno de:
- MONGO ATLAS
- JSON WEB TOKEN
- MAILING


## Desarrollo de Primera Entrega Backend 3
Se agregan los endpoints:
- /api/mocks/mockingusers  --> Devuelve 50 Usuarios (no guarda en Mongo)
- /api/mocks/generateData/:cantUsers/:cantPets  --> genera {cantUsers} usuarios y {cantPets} pets, los guarda en mongo y muestra los datos
- /api/mocks/users --> Devuelve todos los usuarios de Mongo 
- /api/mocks/pets --> Devuelve todos los Pets de Mongo

## Desarrollo de Entrega Final Backend 3
Se agrega la documentacion de los Endpoints de Usuario a traves de SWAGGER
- /docs

TESTS UNITARIOS (No se requiere en la entrega)
Se agregan Tests Unitarios de DAO de Usuarios
Metodo de Testeo: 
- Ejecutar "node src/test/unitarios/user.test.js" 


TEST DE INTEGRACION (Solo se requiere de USUARIOS)
Se agregan Test de Integracion de Endpoints de Usuarios
Metodo de Testeo: 
- Ejecutar "node serverExpress.js" 
- Ejecutar "node src/test/integracion/user.test.js" 

Se agregan Test de Integracion de Endpoints de Productos
Metodo de Testeo: 
- Ejecutar "node serverExpress.js" 
- Ejecutar "node src/test/integracion/product.test.js" 

Se agregan Test de Integracion de Endpoints de Carrito
Metodo de Testeo: 
- Ejecutar "node serverExpress.js" 
- Ejecutar "node src/test/integracion/cart.test.js" 




