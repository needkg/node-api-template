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

		const { token } = await service.authenticateUser(email, password);

        return res.status(200).json({
            message: "Login successful",
            token
        });

	} catch (err) {
		return res.status(err.status || 500).json({
			status: err.status || 500,
			error: err.error || "Internal Server Error",
			message: err.message
		});
	}
	
}

export async function proccessUserRegistration(req, res) {

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