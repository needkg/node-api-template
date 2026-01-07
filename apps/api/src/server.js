import "dotenv/config";

import app from "./app.js";
import initDatabase from "./infra/database/init.js";

const PORT = process.env.API_PORT || 3000;

async function startServer() {
    await initDatabase();

    app.listen(PORT, () => {
        console.log(`🔥 Server running on http://localhost:${PORT}`);
    });
}

startServer();