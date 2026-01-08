import * as repository from "./admin.repository.js";

export async function listUsersForAdmin() {
    const users = await repository.fetchUsers();

    const usersById = {};

    for (const user of users) {
        usersById[user.id] = {
            userId: user.userId,
            name: user.name,
            username: user.username,
            email: user.email,
            isActivated: Boolean(user.isActivated),
            isAdmin: Boolean(user.isAdmin)
        };
    }

    return {
        users: usersById
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