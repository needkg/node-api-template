import * as repository from "./admin.repository.js";

export async function listUsersForAdmin() {
    const users = await repository.findUsers();

    const rows = [];

    for (const user of users) {
        rows.push({
            internalId: user.id,
            userId: user.user_id,
            name: user.name,
            username: user.username,
            email: user.email,
            isActivated: Boolean(user.is_activated),
            role: user.role
        });
    }

    return {
        rows
    };
}

export async function updateUserProfile(userId, name, username, email, isActivated, isAdmin) {
    try {
        await repository.updateUserById(userId, name, username, email, isActivated, isAdmin);
    } catch (err) {
        throw { status: err.status || 500,
                error: err.error || "Internal Server Error",
                message: err.message
            };
    }
}