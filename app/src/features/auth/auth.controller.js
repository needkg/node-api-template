import { revokeAllRefreshTokens } from "../../shared/jwt/jwt.repository.js";
import { verifyRefreshToken } from "../../shared/jwt/jwt.service.js";
import * as service from "./auth.service.js";

export async function processUserAuthentication(req, res) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				status: 400,
				error: "Bad Request",
				message: "Email and password are required"
			});
		}

		const result = await service.authenticateUser(email, password);

		res.cookie("refresh_token", result.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/auth"
		});

		return res.status(200).json({
			accessToken: result.accessToken
		});
	} catch (err) {
		return res.status(err.status || 500).json({
			status: err.status || 500,
			error: err.error || "Internal Server Error",
			message: err.message
		});
	}
}

export async function processUserRegistration(req, res) {
	try {
		const { name, username, email, password } = req.body;

		if (!name || !username || !email || !password) {
			return res.status(400).json({
				status: 400,
				error: "Bad Request",
				message: "Name, username, email, and password are required"
			});
		}

		await service.registerUser(name, username, email, password);
		return res.status(204).send();
	} catch (err) {
		return res.status(err.status || 500).json({
			status: err.status || 500,
			error: err.error || "Internal Server Error",
			message: err.message
		});
	}
}

export async function processUserRefreshToken(req, res) {
	try {
		const refreshToken = req.cookies.refresh_token;

		if (!refreshToken) {
			return res.status(401).json({
				status: 401,
				error: "Unauthorized",
				message: "Refresh Token missing"
			});
		}

		const result = await service.refreshUserToken(refreshToken);

		res.cookie("refresh_token", result.refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/auth"
		});

		return res.status(200).json({
			accessToken: result.accessToken
		});
	} catch (err) {
		return res.status(err.status || 500).json({
			status: err.status || 500,
			error: err.error || "Internal Server Error",
			message: err.message
		});
	}
}

export async function processUserLogout(req, res) {
	try {
		const refreshToken = req.cookies.refresh_token;

		if (!refreshToken) {
			return res.status(204).send();
		}

		await service.logoutUser(refreshToken);

		res.clearCookie("refresh_token", {
			httpOnly: true,
			sameSite: "strict",
			path: "/auth"
		});

		return res.status(204).send();
	} catch (err) {
		return res.status(err.status || 500).json({
			status: err.status || 500,
			error: err.error || "Internal Server Error",
			message: err.message
		});
	}
}

export async function processUserLogoutAll(req, res) {

	try {
		const refreshToken = req.cookies.refresh_token;

		const payload = verifyRefreshToken(refreshToken);

		await revokeAllRefreshTokens(payload.sub);
		
		res.clearCookie("refresh_token", {
			httpOnly: true,
			sameSite: "strict",
			path: "/auth"
		});			

		return res.status(204).send();
	} catch (err) {
		return res.status(err.status || 500).json({
			status: err.status || 500,
			error: err.error || "Internal Server Error",
			message: err.message
		});
	}
}