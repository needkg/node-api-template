import "dotenv/config";

import app from "./app.js";
import { connectDatabase } from "./infra/database/init.js";
import { setupDatabase } from "./infra/database/setup.js";
import { corsMiddleware } from "./shared/middlewares/cors.middleware.js";

app.use(corsMiddleware);

const PORT = process.env.API_PORT || 3000;

async function startServer() {
    await connectDatabase();
    await setupDatabase();

    app.listen(PORT, () => {
        console.log(`🔥 Server running on http://localhost:${PORT}`);
    });
}

startServer();