
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/config";

/**
 * Auth token use JWT
 */
export class AuthToken {
	option: SignOptions = {
		expiresIn: "60 seconds"
	};
	payload: string | object = {};

	constructor(payload: string | object, option?: SignOptions) {
		if (option) {
			this.option = option;
		}
		if (payload) {
			this.payload = payload;
		}
	}

	async generate(): Promise<string> {
		let result;
		try {
			result = jwt.sign(this.payload, config.jwtSecret, this.option);
		} catch (err) {
			throw err;
		}
		return result;
	}
}