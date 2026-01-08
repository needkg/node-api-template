import * as service from "./user.service.js";

export async function handleUserProfile(req, res) {

    try {

        const { userId } = req.user;

        if (!userId) {
            return res.status(400).json({
                status: 400,
                error: "Bad Request",
                message: "User ID is required"
            });
        }

    const profile = await service.getUserProfile(userId);
    return res.status(200).json({user: profile});

    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message
        });
    }
}

export async function handleUpdateUserProfile(req, res) {
    try {
        const { userId } = req.user;
        const { name, username, email } = req.body;

        service.updateUserProfile(userId, name, username, email);

        return res.status(204).send();

    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message
        });
    }
}