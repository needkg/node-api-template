import express from "express";
import cookieParser from "cookie-parser";

import adminRoutes from "./features/admin/admin.routes.js";
import authRoutes from "./features/auth/auth.routes.js";
import setupRoutes from "./features/setup/setup.routes.js";
import userRoutes from "./features/users/user.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(setupRoutes);
app.use(userRoutes);
app.use(adminRoutes);

app.get("/", (req, res) => {
    return res.status(403).json({
        status: 403,
        error: "Unauthorized",
        message: "You are not authorized to access this resource"
    });
});

export default app;