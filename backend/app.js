import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/product.js";
import { connectDatabse } from "./config/dbConnect.js";
import errorMiddleware from "./middleware/erros.js";

const app = express();
dotenv.config({ path: "backend/config/config.env" });

connectDatabse();

app.use(express.json());

app.use("/api/v1", productRoutes);

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado na porta 3000");
});

process.on("unhandledRejection", (err) => {
  console.log(`ERRO: ${err}`);
  console.log("Desligando servidor devido Rejeição de Promessa não tratadas");
  server.close(() => {
    process.exit(1);
  });
});