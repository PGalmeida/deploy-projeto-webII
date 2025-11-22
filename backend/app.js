import express from "express";
import dotenv from "dotenv";
import cors from "cors";
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

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ 
    message: "API está funcionando!",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/v1/test", (req, res) => {
  res.json({ 
    message: "API v1 está funcionando!",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/v1", authRoutes);
app.use("/api/v1/chatbot", chatbotRoutes);
app.use("/api/v1", vetRoutes);
app.use("/api/v1/clinics", clinicRoutes);
app.use("/api/v1/veterinaries", veterinaryRoutes);

app.use(errorMiddleware);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Rota não encontrada: ${req.method} ${req.path}`,
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {});

process.on("uncaughtException", (err) => {
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
