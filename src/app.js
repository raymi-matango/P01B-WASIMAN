import express from "express";
import session from "express-session";
import autenticarRoutes from "./routes/autenticar.routes.js";
import { errorHandler } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';

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
app.use(errorHandler);

export default app;
