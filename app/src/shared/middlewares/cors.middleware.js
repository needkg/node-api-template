import { corsOptions } from "../../config/cors.config.js";
import cors from 'cors';

export const corsMiddleware = cors(corsOptions);