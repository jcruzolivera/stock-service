import readline from "readline";
import { sendOrderPlaced } from "../sendOrderPlaced"; // Asegúrate de ajustar la ruta si es necesario

// Interfaz de readline para capturar la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  // Preguntar al usuario por el articleId y quantity
  rl.question("Ingresa el articleId a validar: ", (articleId) => {
    rl.question("Ingresa la cantidad de la orden: ", async (quantity) => {
      // Construir el objeto de datos y convertirlo a JSON
      const order = {
        articleId: Number(articleId),
        quantity: Number(quantity),
      };

      // Enviar la orden
      await sendOrderPlaced(JSON.stringify(order));

      console.log("Orden enviada:", order);

      rl.close(); // Cerrar la interfaz de readline
    });
  });
})();
