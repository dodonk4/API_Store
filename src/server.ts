import { app } from "./app.ts";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(process.env["DATABASE_URL"]);
  });

export default server;