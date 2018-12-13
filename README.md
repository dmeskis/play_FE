# Play Front-End

## Description

* This is the front-end repository for the full-stack Play project of Mod 4 at Turing School of Software and Design. The back-end repository can be found [here](https://github.com/JLing88/play). [Jesse Ling](https://github.com/JLing88) and I built this project out over two weeks following the specifications found [here](http://backend.turing.io/module4/projects/play/play). It utilizes the [Musixmatch API](https://developer.musixmatch.com/) as well as our back-end API to create a user interface for finding songs by artist and adding them to custom playlists. We built it using the [Express](https://expressjs.com/) framework for [NodeJS](https://nodejs.org/). We also used the [Knex.js](https://knexjs.org/) SQL builder to query our database on our backend. We were not exposed to these technologies before this project, so it was an exercise in juggling our learning and then applying these technical concepts.

See the site in action here: https://playfe.herokuapp.com/

![Index Preview](https://i.imgur.com/UaagM1h.png)
![Playlist Preview](https://i.imgur.com/nX7Bimx.png)

## Initial Setup

1. Clone this repository and rename the repository to anything you'd like in one command:

  ```shell
  git clone https://github.com/dmeskis/play_FE.git <name of your choice>
  ```
2. Change into the new directory.

3. Install the dependencies of the starter kit:

  ```shell
  npm install
  ```
4. Follow the instructions for setting up [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) to set up your       environment variables. You will need to sign up for an API key at Musixmatch and assign that to the variable MUSIXMATCH_API_KEY in your .env file to make requests to their api.

5. Head over to our [back-end repository](https://github.com/JLing88/play) for this project and follow the instructions there if you'd like to host your own copy of our backend. Otherwise leave the code as it is and use our backend.

## Running the Server Locally

To see your code in action locally, you need to fire up a development server. Use the command:

```shell
npm start
```

Once the server is running, visit in your browser:

* `http://localhost:8080/` to run your application.

## Built With

* [JavaScript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* [Express](https://expressjs.com/)
* [Mocha](https://mochajs.org/)
* [Chai](https://chaijs.com/)

