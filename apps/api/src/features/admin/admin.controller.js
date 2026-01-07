import * as service from "./admin.service.js";

export async function handleListUsers(req, res) {

    try {
        const rows = await service.listUsersForAdmin();

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                status: 404,
                error: "Not Found",
                message: "No users found"
            });
        }

        return res.status(200).json({
            rows
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message
        });
    }
}

export async function desactiveUser(req, res) {

    try {
        const targetUserId = req.params.userId;
        const loggedInUserId = req.user.userId;

        if (targetUserId === loggedInUserId) {
            return res.status(400).json({
                status: 400,
                error: "Bad Request",
                message: "Admin users cannot deactivate their own accounts"
            });
        }

        await desactiveUser(targetUserId);

        return res.status(204).send();
    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message
        });
    }

}

export async function activeUser(req, res) {

    try {
        const targetUserId = req.params.userId;

        await activeUser(targetUserId);

        return res.status(204).send();
    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message
        });
    }

}