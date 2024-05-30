import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

export default (user: { _id: string }): string => {
	const keysPath = path.resolve(process.cwd(), "keys");
	const privateKey = fs.readFileSync(path.join(keysPath, "decrypted_private_key.pem"));

	return jwt.sign({ id: user._id }, privateKey, {
		algorithm: "RS256",
	});
};
