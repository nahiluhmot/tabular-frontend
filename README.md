# Tabular Frontend

This repository is the frontend for my final project for NU CS 4550 Web Development.
It is a single page application built primarily using [React](https://facebook.github.io/react/), [Bower](http://bower.io/), [Gulp](http://gulpjs.com/), and [Aviator](https://github.com/swipely/aviator).
The styling is done using [Bootstrap](http://getbootstrap.com/) and [Flat UI](http://designmodo.github.io/Flat-UI/).

The backend for this project is [also hosted on GitHub](https://github.com/nahiluhmot/tabular-backend/).

## Development

To develop for this application, one needs to have [git](http://git-scm.com) and [Node JS](https://nodejs.org/) installed on their system first.
With these tools installed, run:

```bash
$ npm install -g gulp bower
$ git clone https://github.com/nahiluhmot/tabular-frontend.git ~/tabular-frontend/
$ cd ~/tabular-frontend/
$ npm install
$ bower install
$ gulp serve
```

Then, open `http://localhost:3000/` in your browser, and you should see the home page.

## Production Builds

This repository is equipped to build [`docker`](https://www.docker.com/) image using its [`Dockerfile`](https://github.com/nahiluhmot/tabular-frontend/blob/master/Dockerfile).
On a machine where `docker` is installed, you can build the image using the following command:

```bash
$ cd ~/tabular-frontend/
$ docker build -t tabular-frontend:latest .`
```

This will produce an image whose default command is to run [`nginx`](http://nginx.org/) with the application code.
The image expects `http://tabular-backend:4567/` to be accessible, which is easy using `docker` container linking.

To run the production server, you can run:

```bash
# Assuming there is already a container serving the backend on port 4567.
$ docker run \
  --name tabular-frontend \
  --link tabular-backend:tabular-backend \
  --port 1337:1337 \
  --detach \
  tabular-frontend:latest
```

Opening port `http://localhost:1337/` in your browser should display the home page.

## Directory Structure

Directory           | Checked In? | Description
--------------------|-------------|------------
`bower_components/` | No          | Frontend dependencies installed by `bower`
`build/`            | No          | Directory where built assets live
`gulp/`             | Yes         | Holds the `gulp` tasks and configuration, which are essentially asynchronous build scripts
`html/`             | Yes         | HTML source code for the web page
`js/`               | Yes         | The main web application code
`less/`             | Yes         | Styling for the site
`node_modules/`     | No          | Build dependencies
`bower.json`        | Yes         | Configuration for frontend dependencies
`Dockerfile`        | Yes         | `docker` configuration
`gulpfile.js`       | Yes         | Bootstraps the `gulp` tasks
`nginx.conf`        | Yes         | `nginx` configuration
`package.json`      | Yes         | Build dependency configuration
`README.md`         | Yes         | Documentation
