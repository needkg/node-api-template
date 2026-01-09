import { randomUUID } from "crypto";
import { createUser, findRefreshToken, findUserByEmail, revokeAllTokensByUser, revokeRefreshToken, saveRefreshToken } from "./auth.repository.js";
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiryDate } from "../../shared/auth/jwt.js";
import { hashString, compareHashedString } from "../../shared/auth/hash.js";

export async function authenticateUser(email, password) {
    const user = await findUserByEmail(email);

    if (!user) {
        throw { status: 401, error: "Unauthorized", message: "Invalid credentials" };
    }

    if (!user.isActivated) {
        throw { status: 403, error: "Forbidden", message: "User is disabled" };
    }

    const validPassword = await compareHashedString(password, user.password);

    if (!validPassword) {
        throw { status: 401, error: "Unauthorized", message: "Invalid credentials" };
    }

    const accessToken = generateAccessToken(user.userId);
    const refreshToken = generateRefreshToken(user.userId);
    const expiresAt = getRefreshTokenExpiryDate(refreshToken);

    await saveRefreshToken(
        user.userId,
        refreshToken,
        expiresAt
    );

    return {
        accessToken,
        refreshToken
    };
}

export async function registerUser(name, username, email, password) {
    const user = {
        userId: randomUUID(),
        name,
        username,
        email,
        password: await hashString(password),
        isActivated: true
    };

    await createUser(user);
}

export async function refreshUserToken(token) {
    const storedToken = await findRefreshToken(token);

    if (!storedToken) {
        throw { status: 403, error: "Forbidden", message: "Invalid or expired refresh token" };
    }

    if (storedToken.revoked) {
        await revokeAllTokensByUser(storedToken.userId);
        throw { status: 403, error: "Forbidden", message: "Token reuse detected. Please sign in again." };
    }

    if (storedToken.expiresAt && storedToken.expiresAt < new Date()) {
        throw { status: 401, error: "Unauthorized", message: "Refresh token has expired" };
    }

    const accessToken = generateAccessToken(storedToken.userId);
    const refreshToken = generateRefreshToken(storedToken.userId);
    const expiresAt = getRefreshTokenExpiryDate(refreshToken);

    await saveRefreshToken(
        storedToken.userId,
        refreshToken,
        expiresAt
    );

    await revokeRefreshToken(token);

    return {
        accessToken,
        refreshToken
    };
}

export async function logoutUser(token) {
    await revokeRefreshToken(token);
}