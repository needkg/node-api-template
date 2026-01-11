import * as service from "./admin.service.js";

export async function handleListUsers(req, res) {

    try {
        const users = await service.listUsersForAdmin();

        if (!users || users.length === 0) {
            return res.status(404).json({
                status: 404,
                error: "Not Found",
                message: "No users found"
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Users retrieved successfully",
            data: { 
                users: users.rows,
                total: users.rows.length
            }
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message || "User retrieval failed"
        });
    }
}

export async function handleUpdateUser(req, res) {
    try {

        const targetUserId = req.params.userId;
        const loggedInUserId = req.user.userId;

        if (targetUserId === loggedInUserId) {
            return res.status(400).json({
                status: 400,
                error: "Bad Request",
                message: "You cannot update your own profile via this endpoint"
            });
        }

        const { name, username, email, isActivated, role } = req.body;

        if (!name || !username || !email || !isActivated || !role) {
            return res.status(400).json({
                status: 400,
                error: "Bad Request",
                message: "All fields (name, username, email, isActivated, role) are required"
            });
        }

        await service.updateUserProfile(targetUserId, name, username, email, isActivated, role);
        return res.status(200).json({
            status: 200,
            message: "User updated successfully",
            data: {
                userId: targetUserId,
                name: name,
                username: username,
                email: email,
                isActivated: Boolean(isActivated),
                role: role,
                updatedAt: new Date().toISOString()
            }
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            error: err.error || "Internal Server Error",
            message: err.message || "User update failed"
        });
    }
}