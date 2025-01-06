import express, { Express } from "express";
import MainRouter from "./src/route/main.route";
import helmet from "helmet";
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();

const BACK_PORT = process.env.BACK_PORT;
/* */
const allowedOrigins = [process.env.FRONT_URL_LOCAL];

const corsOptions: cors.CorsOptions = {
  origin: (origin:any, callback:any) => {
    
    // Autorise les requêtes provenant des origines spécifiées
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true, // Permettre l'envoi de cookies et autres identifiants
  optionsSuccessStatus: 200, // Réponse pour les requêtes OPTIONS (preflight)
};


const app: Express = express();
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use("/", MainRouter);

app.listen(BACK_PORT || 5432);