import { randomUUID } from "crypto";

import { findUserByEmail, insertUser } from "./auth.repository.js";
import { comparePasswords, hashPassword } from "./services/password.service.js";
import { generateToken } from "./services/token.service.js";

export async function authenticateUser(email, password) {

    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }

    if (!user.isActivated) {
        throw new Error("USER_DISABLED");
    }

    const validPassword = await comparePasswords(password, user.password);

    if (!validPassword) {
        throw new Error("INVALID_CREDENTIALS");
    }

    return {
        token: await generateToken({ userId: user.userId })
    };

}

export async function registerUser(name, username, email, password) {

    const user = {
        userId: randomUUID(),
        name,
        username,
        email,
        password: await hashPassword(password),
        isActivated: true
    }

    await insertUser(user);
    
}