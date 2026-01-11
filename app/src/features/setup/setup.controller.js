import * as service from "./setup.service.js";

export async function handleCreateFirstAdmin(req, res) {

    try {

        const { name, username, email, password } = req.body;

        const user = await service.createFirstAdmin(name, username, email, password)

        return res.status(201).json({
            status: 201,
            message: "First admin created successfully",
            data: {
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                isActivated: true,
                createdAt: new Date().toISOString()
            }
        });

    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message || "First admin creation failed"
        });
    }
}

export async function handleGetSetupStatus(req, res) {

    try {

        const setupStatus = await service.verifySetupStatus();

        return res.status(200).json({
            status: 200,
            message: "Setup status retrieved successfully",
            data: {
                setupStatus: {
                    component: setupStatus[0].component,
                    status: setupStatus[0].status
                }
            }
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message || "Failed to retrieve setup status"
        });
    }
}