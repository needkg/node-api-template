import * as service from "./auth.service.js";

export async function processUserAuthentication(req, res) {
	try {
		const { login, password } = req.body;

		const { accessToken, refreshToken, user } = await service.authenticateUser(login, password);

		res.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/auth"
		});

		return res.status(200).json({
			status: 200,
			message: "User authenticated successfully",
			data: {
				name: user.name,
				username: user.username,
				email: user.email,
				role: user.role,
				isActivated: Boolean(user.is_activated),
				createdAt: new Date().toISOString(),
				accessToken: accessToken
			}
		});
	} catch (err) {
		return res.status(err.status || 500).json({
			status: err.status || 500,
			error: err.error || "Internal Server Error",
			message: err.message || "Authentication failed"
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
				message: "Name, username, email and password are required"
			});
		}

		const registeredUser = await service.registerUser(name, username, email, password);

		return res.status(200).json({
			status: 200,
			message: "User registered successfully",
			data: {
				name: registeredUser.name,
				username: registeredUser.username,
				email: registeredUser.email,
				role: registeredUser.role,
				isActivated: Boolean(registeredUser.is_activated),
				createdAt: new Date().toISOString()
			}
		});
	} catch (err) {
		return res.status(err.status || 500).json({
			status: err.status || 500,
			error: err.error || "Internal Server Error",
			message: err.message || "Registration failed"
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
				message: "Refresh token is required"
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
			status: 200,
			message: "Token refreshed successfully",
			data: {
				accessToken: result.accessToken
			}
		});
	} catch (err) {
		return res.status(err.status || 500).json({
			status: err.status || 500,
			error: err.error || "Internal Server Error",
			message: err.message || "Token refresh failed"
		});
	}
}

export async function processUserLogout(req, res) {
	try {
		const refreshToken = req.cookies.refresh_token;

		if (refreshToken == undefined) {
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
			message: err.message || "Logout failed"
		});
	}
}

export async function processUserLogoutAll(req, res) {

	try {
		const refreshToken = req.cookies.refresh_token;

		if (!refreshToken) {
			return res.status(204).send();
		}

		await service.logoutAll(refreshToken);

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
			message: err.message || "Logout from all devices failed"
		});
	}
}