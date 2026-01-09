import * as repository from "./user.repository.js";

export async function getUserProfile(userId) {

    try {

        const profile = await repository.findUserProfile(userId);

        return profile;

    } catch (err) {
        throw { status: err.status || 500,
                error: err.error || "Internal Server Error",
                message: err.message
             };
    }

}

export async function updateUserProfile(userId, name, username, email) {
    try {
        await repository.updateUserById(userId, name, username, email);
    } catch (err) {
        throw { status: err.status || 500,
                error: err.error || "Internal Server Error",
                message: err.message
            };
    }
}