FROM node:20.17.0
WORKDIR /app
COPY package*.json ./
COPY . .
#COPY .env .env
RUN npm install
EXPOSE 8080
CMD ["node", "./serverExpress.js"]

# Comando de Compilacion: docker build -t api-coder .
# Comando para ver las imagenes: docker images

#                                           Puerto real:Puerto Interno de docker (el expuesto)
# Comando generar contenedor: docker run -p 8080:8080 nombreContenedor



#Subirlo a DockerHub
# 1- Logueo: docker login
# 2- Crear Imagen a subir: docker tag nombreDeImagenEnDocker username/nombreDeImagen:1.0.0
# 3- Subir la imagen: docker push username/nombreDeImagen:1.0.0