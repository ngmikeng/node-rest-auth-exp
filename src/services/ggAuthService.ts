import { OAuth2Client, OAuth2ClientOptions } from 'google-auth-library';
import config from '../config/config';

export class GgAuthService {
	client: any;

	constructor(option?: OAuth2ClientOptions) {
		this.client = new OAuth2Client(config.googleOAuthClientId);
	}

	async verify(idToken: string) {
		try {
			const ticket = await this.client.verifyIdToken({
				idToken: idToken,
				audience: config.googleWebClientId,
			});
			const payload = ticket.getPayload();
			return payload;
		} catch (err) {
			throw err;
		}
	}
}