export default async (token: string): Promise<{ id: string }> => {
	const fs = require("fs");
	const jwt = require("jsonwebtoken");
	const path = require("path");

	const keysPath = path.resolve(process.cwd(), "keys");
	const publicKey = await fs.readFileSync(path.join(keysPath, "public_key.pem"), 'utf8');
	return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
};
