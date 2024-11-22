# Usa una imagen base de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios al contenedor
COPY package*.json tsconfig.json ./

# Instala TODAS las dependencias, incluidas las de desarrollo
RUN npm install

# Copia el código fuente al contenedor
COPY . .

# Compila el proyecto TypeScript a JavaScript
RUN npx tsc

# Elimina las dependencias de desarrollo después de compilar para optimizar la imagen
RUN npm prune --production

# Expone el puerto que usará tu microservicio
EXPOSE 3000

# Comando para ejecutar el servidor
CMD ["npx", "nodemon", "dist/server.js"]