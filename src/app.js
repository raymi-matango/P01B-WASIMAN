import express from "express";
import session from "express-session";
import cors from "cors"; // Importar el middleware cors
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
// Importar routes
import autenticarRoutes from "./routes/autenticar.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";
import viajesRoutes from "./routes/viajes.routes.js";

dotenv.config(); // Cargar variables de entorno

const app = express();
app.use(express.json());

// Configurar CORS
app.use(cors({
  origin: '*', // Permite todas las solicitudes de cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
}));

app.use(
  session({
    secret: "pachakaman2024*",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

// API Rest Cliente
app.use("/api/autenticar", autenticarRoutes);
app.use("/api/reservas", reservasRoutes); 
app.use("/api/viajes", viajesRoutes); 

app.use(errorHandler);

export default app;
