import { randomUUID } from "crypto";
import { findRefreshTokenByUserId, revokeAllRefreshTokens, revokeRefreshToken, saveRefreshToken } from "../../shared/jwt/jwt.repository.js";
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiryDate, verifyRefreshToken } from "../../shared/jwt/jwt.service.js";
import { hashString, compareHashedString } from "../../shared/bcrypt/bcrypt.service.js";
import { createUser, getUserAuthDataByEmail } from "./auth.repository.js";

export async function authenticateUser(email, password) {
    const user = await getUserAuthDataByEmail(email);

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

    const hashedRefreshToken = await hashString(refreshToken);

    await saveRefreshToken(
        user.userId,
        hashedRefreshToken,
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

    const payload = await verifyRefreshToken(token);

    const storedToken = await findRefreshTokenByUserId(payload.sub);

    if (!storedToken) {
        throw { status: 403, error: "Forbidden", message: "Invalid or expired refresh token" };
    }

    if (storedToken.revoked) {
        await revokeAllRefreshTokens(storedToken.userId);
        throw { status: 403, error: "Forbidden", message: "Token reuse detected. Please sign in again." };
    }

    if (storedToken.expiresAt && storedToken.expiresAt < new Date()) {
        throw { status: 401, error: "Unauthorized", message: "Refresh token has expired" };
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

export async function logoutUser(token) {
    await revokeRefreshToken(token);
}