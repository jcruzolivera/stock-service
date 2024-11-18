

# Microservicio de Stock

Este microservicio gestiona el **stock de productos** y los movimientos de inventario en tiempo real. Permite consultar, actualizar, reposicionar y calcular el stock disponible de los artículos, así como generar notificaciones y emitir mensajes a otros microservicios relacionados con el inventario.

## Características

- **Gestión de stock**: Permite consultar y configurar el stock de productos, incluyendo el manejo de reposiciones.
- **Movimientos de stock**: Realiza un seguimiento detallado de los movimientos de stock (entradas, salidas, ajustes).
- **Notificaciones en tiempo real**: Emite notificaciones a otros microservicios sobre actualizaciones importantes de stock.
- **Autenticación y seguridad**: Integrado con **JWT** para garantizar una gestión segura de las operaciones.
- **Pruebas de carga**: El microservicio está preparado para manejar cargas elevadas de consultas y actualizaciones de inventario.

## Tecnologías

- **Node.js**: Plataforma de JavaScript para ejecutar el microservicio.
- **TypeScript**: Lenguaje utilizado para mejorar la robustez del código.
- **Express**: Framework de Node.js para la creación de API RESTful.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar información de los artículos y movimientos de stock.
- **RabbitMQ**: Sistema de mensajería para la comunicación asincrónica con otros microservicios.
- **JWT**: Para el manejo seguro de tokens de autenticación.

## Requisitos

- Node.js >= 18.0.0
- MongoDB >= 4.0
- RabbitMQ (si se utiliza la integración de mensajería)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/microservicio-stock.git
   cd microservicio-stock
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
   ```
   DB_URI=mongodb://localhost:27017/stockdb
   RABBITMQ_URI=amqp://localhost
   JWT_SECRET=tu-secreto-jwt
   ```

4. Ejecuta el microservicio:
   ```bash
   npm start
   ```

   El microservicio estará disponible en `http://localhost:3000`.

## Endpoints

- **GET** `/api/stock/{articleId}`: Consulta el stock actual de un artículo.
- **POST** `/api/stock/reposition`: Reposiciona el stock de un artículo.
- **POST** `/api/stock/move`: Realiza un movimiento de stock (entrada, salida, ajuste).
- **GET** `/api/stock/{articleId}/history`: Obtiene el historial de movimientos de stock de un artículo.

## Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna mejora, corrección o nueva funcionalidad que te gustaría agregar, realiza un **fork** del repositorio y envía una **pull request**.

## Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Para más detalles, consulta el archivo [LICENSE](LICENSE).
