export default (user: { _id: string }): string => {
	const path = require("path");
	const fs = require("fs");
	const jwt = require("jsonwebtoken");

	const keysPath = path.resolve(process.cwd(), "keys");
	const privateKey = fs.readFileSync(path.join(keysPath, "decrypted_private_key.pem"));

	return jwt.sign({ id: user._id }, privateKey, {
		algorithm: "RS256",
	});
};
