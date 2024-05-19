import getEnvVar from "env/index";
import { OAuth2Client, TokenPayload, gaxios } from "google-auth-library"

class GoogleOAuthClient {
    #client: OAuth2Client;

    constructor() {
        this.#client = new OAuth2Client({
            clientId: getEnvVar('GOOGLE_OAUTH_CLIENT_ID'),
            clientSecret: getEnvVar('GOOGLE_OAUTH_CLIENT_SECRET'),
            redirectUri: getEnvVar('GOOGLE_OAUTH_REDIRECT_URI'),
        });
    }

    generateAuthUrl(): string {
        return this.#client.generateAuthUrl({ scope: ['profile', 'email'] });
    }

    async getTokenAndVerifyFromCode(code: string) {
        try {
            const { tokens } = await this.#client.getToken(code);   
            const verifyResponse = await this.#client.verifyIdToken({ idToken: tokens.id_token as string, audience: getEnvVar('GOOGLE_OAUTH_CLIENT_ID') });
            return verifyResponse.getPayload() as TokenPayload;
        } catch (e: unknown) {
            const error = e as gaxios.GaxiosError;
            throw new Error(JSON.stringify({ name: error.name, message: error.message, status: error.status }))
        }
    }

}

const googleOAuthClient = new GoogleOAuthClient();

export default googleOAuthClient;
