import fs from "fs";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

export default (token: string): string | JwtPayload => {
	const keysPath = path.resolve(process.cwd(), "keys");
	const publicKey = fs.readFileSync(path.join(keysPath, "public_key.pem"), "utf8");

	return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
};
