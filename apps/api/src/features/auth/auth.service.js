import { randomUUID } from "crypto";

import { findUserByEmail, insertUser } from "./auth.repository.js";
import { comparePasswords, hashPassword } from "../../shared/auth/hash.js";
import { generateToken } from "../../shared/auth/jwt.js";

export async function authenticateUser(email, password) {

    const user = await findUserByEmail(email);

    if (!user) {
        throw { status: 401, error: "Unauthorized", message: "Invalid credentials" };
    }

    if (!user.isActivated) {
        throw { status: 403, error: "Forbidden", message: "User is disabled" };
    }

    const validPassword = await comparePasswords(password, user.password);

    if (!validPassword) {
        throw { status: 401, error: "Unauthorized", message: "Invalid credentials" };
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