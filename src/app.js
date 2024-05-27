import express from "express";
import session from "express-session";
import { errorHandler } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
//importar routes
import autenticarRoutes from "./routes/autenticar.routes.js";
import reservasRoutes from "./routes/reservas.routes.js"
import viajesRoutes from "./routes/viajes.routes.js";


dotenv.config(); // Cargar variables de entorno

const app = express();
app.use(express.json());

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
