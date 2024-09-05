# Proyecto Final Backend 2

Este proyecto toma como base la entrega final de Backend 1 en el cual se desarrolló un Servidor Backend para un e-commerce con persistencia en MONGODB, el mismo posee los siguientes Endpoints:

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
