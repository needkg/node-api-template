import express from "express";
import authRoutes from "./features/auth/auth.routes.js";
import dbRoutes from "./features/setup/setup.routes.js";
import adminRoutes from "./features/admin/admin.routes.js";
import userRoutes from "./features/users/user.routes.js";
import databaseRoutes from "./features/setup/setup.routes.js";

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(dbRoutes);
app.use(userRoutes);
app.use(databaseRoutes);
app.use(adminRoutes);

app.get("/", (req, res) => {
    return res.status(403).json({
      status: 403,
      error: "Unauthorized",
      message: "You are not authorized to access this resource"
    });
});

export default app;