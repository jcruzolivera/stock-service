import readline from "readline";
import { sendArticleValidation } from "../sendArticleValidation"; // Asegúrate de ajustar la ruta si es necesario

// Interfaz de readline para capturar la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  // Preguntar al usuario por el articleId
  rl.question("Ingresa el articleId a validar: ", async (articleId) => {
    // Convertir el input en un número y enviarlo a la función
    await sendArticleValidation(Number(articleId));

    console.log(`Validación enviada para articleId: ${articleId}`);

    rl.close(); // Cerrar la interfaz de readline
  });
})();
