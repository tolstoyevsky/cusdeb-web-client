# CusDeb Web Client

CusDeb Web Client is a web client which relies on such CusDeb services as [CusDeb API](https://github.com/tolstoyevsky/cusdeb-api), [Black Magic](https://github.com/tolstoyevsky/blackmagic), [Dominion](https://github.com/tolstoyevsky/dominion) and [Orion](https://github.com/tolstoyevsky/orion).

## Table of Contents

- [Requirements](#requirements)
- [Configuration](#configuration)
- [Building](#building)
- [Authors](#authors)
- [Licensing](#licensing)

## Requirements

CusDeb Web Client requires

* running [CusDeb API](https://github.com/tolstoyevsky/cusdeb-api) and [Black Magic](https://github.com/tolstoyevsky/blackmagic);
* [Node.js](https://nodejs.org/) 10 or above.

## Configuration

CusDeb Web Client can be configured via the following environment variables (called parameters).

| Parameter        | Description |
|------------------|-------------|
| `BM_RPC_URL`     | The URL of the WebSocket API provided by Black Magic. If Black Magic listens on the port 8002, the value of the param *might* look like `ws://127.0.0.1:8002/rpc/token/%token` when running locally. |
| `CUSDEB_API_URL` | The URL of CusDeb API, including its version. The value of the param *must be* `/api/v1` when running locally. |
| `HOST`           | The address of the machine Webpack Dev Server is running on. It helps to check CusDeb Web Client on other devices in a local network. |

## Building

1. Install dependencies by executing

```
$ npm install
```

2. Build a development version of the client (with running [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)), executing

```
$ env CUSDEB_API_URL=/api/v1 BM_RPC_URL=ws://127.0.0.1:8002/rpc/token/%token npm run dev
```

or build a production version of the client, executing something like the following

```
$ env CUSDEB_API_URL=https://ng.cusdeb.com/api/v1 BM_RPC_URL=wss://ng.cusdeb.com/rpc/token/%token npm run build
```

In the second case, [Nginx](https://nginx.org) (or or any other web server) will have to serve the content of the `dist` directory.

## Authors

See [AUTHORS](AUTHORS.md).

## Licensing

CusDeb Web Client is available under the [Apache License, Version 2.0](LICENSE).

