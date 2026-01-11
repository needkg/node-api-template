import { randomUUID } from "crypto";
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiryDate, verifyRefreshToken } from "../../shared/security/token.service.js";
import { hashString, compareHashedString } from "../../shared/security/hash.service.js";
import { createUser, findRefreshTokenByUserId, findUserByLogin, revokeAllRefreshTokens, revokeRefreshToken, saveRefreshToken } from "./auth.repository.js";

export async function authenticateUser(login, password) {

    const user = await findUserByLogin(login);

    if (!user) {
        throw {
            status: 401,
            error: "Unauthorized",
            message: "Invalid credentials"
        };
    }

    const { user_id, password: hashedPassword, is_activated } = user;

    if (!is_activated) {
        throw {
            status: 403,
            error: "Forbidden",
            message: "User account is disabled"
        };
    }

    const validPassword = await compareHashedString(password, hashedPassword);

    if (!validPassword) {
        throw {
            status: 401,
            error: "Unauthorized",
            message: "Invalid credentials"
        };
    }

    const accessToken = generateAccessToken(user_id);
    const refreshToken = generateRefreshToken(user_id);
    const expiresAt = getRefreshTokenExpiryDate(refreshToken);

    const hashedRefreshToken = await hashString(refreshToken);

    await saveRefreshToken(
        user_id,
        hashedRefreshToken,
        expiresAt
    );

    return {
        accessToken,
        refreshToken,
        user
    };
}

export async function registerUser(name, username, email, password) {
    const userToRegister = {
        userId: randomUUID(),
        name,
        username,
        email,
        password: await hashString(password),
        isActivated: true
    };

    const storedUsername = await findUserByLogin(username);
    if (storedUsername) {
        throw {
            status: 409,
            error: "Conflict",
            message: "Username already exists"
        };
    }

    const storedEmail = await findUserByLogin(email);
    if (storedEmail) {
        throw {
            status: 409,
            error: "Conflict",
            message: "Email already exists"
        };
    }

    const registeredUser = await createUser(userToRegister);

    return registeredUser;
}

export async function refreshUserToken(token) {

    const payload = await verifyRefreshToken(token);

    const storedToken = await findRefreshTokenByUserId(payload.sub);

    if (!storedToken) {
        throw { status: 403, error: "Forbidden", message: "Invalid or expired refresh token" };
    }

    if (storedToken.revoked) {
        await revokeAllRefreshTokens(storedToken.userId);
        throw { status: 403, error: "Forbidden", message: "Token reuse detected. Please sign in again" };
    }

    if (storedToken.expiresAt && storedToken.expiresAt < new Date()) {
        throw { status: 401, error: "Unauthorized", message: "Refresh token expired" };
    }


    const accessToken = generateAccessToken(payload.sub);
    const refreshToken = generateRefreshToken(payload.sub);
    const expiresAt = getRefreshTokenExpiryDate(refreshToken);

    const hashedRefreshToken = await hashString(refreshToken);


    await saveRefreshToken(
        payload.sub,
        hashedRefreshToken,
        expiresAt
    );

    await revokeRefreshToken(token);

    return {
        accessToken,
        refreshToken
    };
}

export async function logoutUser(refreshToken) {
    await revokeRefreshToken(refreshToken);
}

export async function logoutAll(refreshToken) {
    const payload = verifyRefreshToken(refreshToken);
    await revokeAllRefreshTokens(payload.sub);
}