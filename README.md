Trello Board
===========

> Webpack 4 boilerplate with Babel, SASS, React 16.6, React router v4, Redux 5

## Requirements
You need node.js pre-installed and you�re good to go.
please use node version >= 8.9.4.

## Setup
Install dependencies
```sh
$ yarn install
```

## Development
Run the local webpack-dev-server with livereload and autocompile on (http://localhost:{port}/)
```sh
$ yarn dev
```
## Deployment
Build the current application
```sh
$ yarn build
```

## Stats
Check the stats of the bundle
```sh
$ yarn stats
```
## Building web app in docker
Build using docker
```sh
$ docker-compose build trello
```

## Running in docker
Running web-app using docker
```sh
$ docker-compose up trello
```

## Docker terminal commands
Running docker terminal commands
```sh
$ docker-compose run --rm trello yarn <script>
```

## Getting into container
Getting into container
```sh
$ docker-compose run --rm trello bash
```

## Development setup
1. Build Image
```sh
$ docker-compose build trello
```
2. Install Package
```sh
$ docker-compose run --rm trello yarn install
```
3. Setup .env

4. Run App in Dev mode
```sh
$ docker-compose up trello
```
