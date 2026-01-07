import * as service from "./setup.service.js";

export async function handleCreateFirstAdmin(req , res) {

    try {

        const { name, username, email, password } = req.body;

        await service.createFirstAdmin(name, username, email, password)

        return res.status(204).send();

    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message
        });
    }
}