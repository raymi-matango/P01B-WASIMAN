import express from "express";
import session from "express-session";
import cors from "cors"; 
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
import autenticarRoutes from "./routes/autenticar.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";
import viajesRoutes from "./routes/viajes.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import comentariosRoutes from "./routes/comentarios.routes.js"; // Importar rutas de comentarios

dotenv.config(); 

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(
  session({
    secret: "pachakaman2024*",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

app.use("/api/autenticar", autenticarRoutes);
app.use("/api/reservas", reservasRoutes); 
app.use("/api/viajes", viajesRoutes); 
app.use("/api/usuarios", usuariosRoutes); 
app.use("/api/comentarios", comentariosRoutes);

app.use(errorHandler);

export default app;
