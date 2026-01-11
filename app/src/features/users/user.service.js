import { compareHashedString, hashString } from "../../shared/security/hash.service.js";
import * as repository from "./user.repository.js";

export async function getUserProfile(userId) {
    return await repository.findUserProfile(userId);
}

export async function updateUserProfile(userId, name, username, email, language, oldPassword, newPassword) {

    const user = await repository.findUserProfile(userId);

    if (!user) {
        throw {
            status: 404,
            error: "Not Found",
            message: "User not found"
        };
    }

    if (newPassword) {

        if (oldPassword == newPassword) {
            throw {
                status: 400,
                error: "Bad Request",
                message: "New password must be different from the old password"
            };
        }

        const user = await repository.findUser(userId);

        const validPassword = await compareHashedString(oldPassword, user.password);

        if (!validPassword) {
            throw {
                status: 401,
                error: "Unauthorized",
                message: "Invalid password"
            };
        }

        const hashedNewPassword = await hashString(newPassword);

        await repository.updateUserPasswordById(userId, hashedNewPassword);

    }

    return await repository.updateUserById(userId, name, username, email, language);
}