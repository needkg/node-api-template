import * as repository from "./user.repository.js";

export async function getUserProfile(userId) {

    try {

        const profile = await repository.findUserProfile(userId);

        //if (profile === undefined) {
        //    throw { status: 404,
        //            error: "Not Found",
        //            message: "User not found"
        //         };
        //}

        return profile;

    } catch (err) {
        throw { status: err.status || 500,
                error: err.error || "Internal Server Error",
                message: err.message
             };
    }

}