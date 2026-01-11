import * as repository from "./user.repository.js";

export async function getUserProfile(userId) {
    return await repository.findUserProfile(userId);
}

export async function updateUserProfile(userId, name, username, email) {
    return await repository.updateUserById(userId, name, username, email);
}