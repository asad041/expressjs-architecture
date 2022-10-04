# ExpressJs (NodeJs) Clean Architecture

[![Code quality](https://github.com/asad041/expressjs-architecture/actions/workflows/code-check.yml/badge.svg)](https://github.com/asad041/expressjs-architecture/actions/workflows/code-check.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

> This is the Component Based Clean Architecture. It's base example include jwt token authorization, http headers security, rate limiter for incoming request, request, params and custom error handlers, events flow, enforces formatter check, eslinter for code quality check, unit tests, producing code coverage report, enforce code coverage, integration of some third party services. (includes: code quality check, formatter, unit tests, code coverage)

## Installation

Use the package manager [yarn](https://yarnpkg.com/) OR [npm](https://www.npmjs.com/) to install app backend.

```bash
# install server dependencies
npm install OR yarn install
```

## Developing

### Build With

- [express](https://expressjs.com/) Node.js framework
- [config](https://www.npmjs.com/package/config) Node.js configuration
- [async-errors](https://www.npmjs.com/package/express-async-errors) ExpressJs async errors
- [eslint](https://eslint.org/) Linting utility
- [rate-limit](https://www.npmjs.com/package/express-rate-limit) Rate limiter

## Configuration

To override the configuration keys in the `config/default.json` you can create multiple configurations according to your environment in the `config` directory.

- create `localhost.json` or `development.json` or `production.json` file(s)
- override the config variable of `default.json`
- run the server according to the environment `npm run local` or `npm run dev` or `npm run prod`

Update the environment configuration set up `localhost.json, default.json, and production.json` and update/override the required values.

```bash
# for example
# default.json
"JWT": {
    "SECRET_KEY": "your_secret_key",
    "EXPIRES_IN": 36000
}

# development.json
"JWT": {
    "SECRET_KEY": "your_development_secret_key",
    "EXPIRES_IN": 2800
}
```

Documentation: [config wiki](https://github.com/node-config/node-config/wiki)

## Usage

You can change default `PORT` number in the `package.json`

- package.json: `scripts: { local: BACKEND_PORT=3021 ....... } ....`

```bash
# run app
yarn local OR yarn dev OR yarn prod

# run unit tests
yarn test:unit

# run code coverage for unit test cases
test:unit:coverage

# run code coverage report check (generates report in html)
test:coverage:check

# run linting
yarn lint:check

# check and force the format
yarn format:check
yarn format:write
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Please see the [license agreement](https://github.com/asad041/expressjs-architecture/blob/main/LICENSE)
