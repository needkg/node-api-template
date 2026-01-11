import * as service from "./user.service.js";

export async function handleUserProfile(req, res) {

    try {

        const userId = req.user.sub;

        if (!userId) {
            return res.status(400).json({
                status: 400,
                error: "Bad Request",
                message: "User ID is required"
            });
        }

    const profile = await service.getUserProfile(userId);
    return res.status(200).json({
        status: 200,
        message: "User profile retrieved successfully",
        data: {
            name: profile.name,
            username: profile.username,
            email: profile.email,
            role: profile.role,
            isActivated: Boolean(profile.is_activated),
            createdAt: profile.created_at
        }
    });

    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message || "User profile retrieval failed"
        });
    }
}

export async function handleUpdateUserProfile(req, res) {
    try {
        const userId = req.user.sub;
        const { name, username, email, language, oldPassword, newPassword } = req.body;

        if (!name || !username || !email) {
        return res.status(400).json({
            status: 400,
            error: "Bad Request",
            message: "Name, username and email are required"
        });
        }

        const updatedUser = await service.updateUserProfile(userId, name, username, email, language, oldPassword, newPassword);

        return res.status(200).json({
            status: 200,
            message: "User profile updated successfully",
            data: {
                name: updatedUser.name,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                isActivated: Boolean(updatedUser.is_activated),
                updatedAt: new Date().toISOString()
            }
        });

    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message || "User profile update failed"
        });
    }
}