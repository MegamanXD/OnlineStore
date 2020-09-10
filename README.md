This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

In the project directory, run:

### 1. `npm install`

This app does not contain the node_modules folder, so you need to install them before you can run it normally.

### 2. `npm start`

Run the app. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
_______________________________________________________________________________________________________________________________
### To build and run the docker container
docker build -t store .
docker run -p 3000:3000 store

docker run -p [real_port]:[app_default_port] store
--> http://localhost:[real_port] to view it in the browser.
