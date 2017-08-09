# This is a simple server with an endpoint that you can post to that will read the "text" property of the reqest body

# Getting started
- `yarn install`
- `npm start`
- if you don't want to use ngrok, just remove that part of the `app.listen()` function
- not using [nodemon](https://github.com/remy/nodemon) because nodemon doesn't kill the ngrok tunnel which causes errors when the app restarts, which results in you having to kill the session manually to kill the tunnel, so there's no point in using nodemon.  However, if you aren't using ngrok, I'd suggest using nodemon (`yarn add nodemon` and put `./node_modules/./bin/nodemon index.js` as the start command in the package.json scripts
- use [Postman](https://www.getpostman.com/) to hit the endpoint or from terminal `curl -H "Content-Type: application/json" -X POST -d '{"text":"Check  out"}' https://filo.ngrok.io/speak`

