import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middleware/erros.js";
import clinicRoutes from "./routes/clinicRoutes.js";
import veterinaryRoutes from "./routes/veterinaryRoutes.js";
import vetRoutes from "./routes/vet.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

const app = express();
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1/chatbot", chatbotRoutes);

app.use("/api/v1", vetRoutes);

const hasPostgres = !!process.env.DATABASE_URL;
if (hasPostgres) {
  app.use("/api/v1/clinics", clinicRoutes);
  app.use("/api/v1/veterinaries", veterinaryRoutes);
} else {
  console.warn(
    "DATABASE_URL não definido. Rotas de clínicas e veterinários desabilitadas."
  );
}

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(`ERRO não tratado: ${err}`);
  console.log("Desligando servidor devido Exceção não tratada");
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(`ERRO: ${err}`);
  console.log("Desligando servidor devido Rejeição de Promessa não tratadas");
  server.close(() => {
    process.exit(1);
  });
});
