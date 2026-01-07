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

export async function activeUser(userId) {
    await repository.updateUserActivation(userId, true);
}

export async function desactiveUser(userId) {
    await repository.updateUserActivation(userId, false);
}