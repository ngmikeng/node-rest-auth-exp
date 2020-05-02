Node Rest API Authentication Experimental
===
- Authentication experimental with node/expressjs
- [References](https://ngmikeng.github.io/node-rest-auth-exp/#/en/auth)

### Dependencies
- Authentication: `jsonwebtoken`, `express-jwt`.
- Validation: `express-validation`, `joi`.
- Log: `winston`.
- ODM: `mongoose`.
- Promise: `bluebird`.
- Unit test: `mocha`, `supertest`.
- Others: `dotenv`, `cors`, `helmet`...

### API Info
- Swagger API docs: http://localhost:5000/api/v1/api-docs/
- Swagger setup using: `swagger-ui-express` and `swagger-jsdoc`.

### Get started
- Typescript >= 2.7.
- Install packages npm
```shell
$ npm install 
```
- Add file `.env`
```shell
$ cp .env.sample .env
```
- Build and run
```shell
$ npm run start
```
- Watch files & auto build
```shell
$ npm run watch
```

### License
MIT
