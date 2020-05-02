
## Scenarios
HTTP protocol is stateless, all requests are stateless.
We would like users states to be rememebered in some cases.

## Session Based Authentication
- The server will create a session for the users after logs in.
- The session id is then stored on a cookie on the user's browser.
- While the user stays logged in, the cookie would be sent along with every request.
- The server compare the session id stored on the cooke against the session info stored in the memory too verify user's identity and sends response with the corresponding state.

![session auth](../img/auth-session.png)

## Token Based Authentication
- Using JSON Web Token (JWT) for authentication.
- The server creates JWT with a secret and sends the JWT to the client.
- The client stores the JWT in cookie/local storage and includes JWT in the header with every request.
- The server validate the JWT with every request from the client and sends response.
- The user’s state is not stored on the server, as the state is stored inside the token on the client side instead.
- Most of the modern web applications use JWT for authentication for reasons including scalability and mobile device authentication.

![token auth](../img/auth-token.png")

## Refresh token
There are many types of token, although in authentication with JWT the most typical are access token and refresh token.
- `Access token`: It contains all the information the server needs to know if the user / device can access the resource you are requesting or not. They are usually expired tokens with a short validity period.
- `Refresh token`: The refresh token is used to generate a new access token. Typically, if the access token has an expiration date, once it expires, the user would have to authenticate again to obtain an access token. With refresh token, this step can be skipped and with a request to the API get a new access token that allows the user to continue accessing the application resources.

![refresh token flow](../img/refresh-token.png")

## Google Sign In flow

![gg signin flow](../img/auth-google.png")

## References
- [Session vs Token Based Authentication](https://medium.com/@sherryhsu/session-vs-token-based-authentication-11a6c5ac45e4)
- [Refresh token with JWT authentication in Node.js](https://solidgeargroup.com/en/refresh-token-with-jwt-authentication-node-js/)
- [JWT token strategy](https://stackoverflow.com/questions/36751304/jwt-token-strategy-for-frontend-and-backend)
- [Google sign in backend auth](https://developers.google.com/identity/sign-in/web/backend-auth)

