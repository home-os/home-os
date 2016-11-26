# home-os

## Getting started

### Production on connected device

Setup your connected device with a standard linux distribution:

* for raspberry pi: see the file setup/raspberry-pi.md
* ...

```javascript
$ ssh pi@<hostname>.local
$ cd ~/home-os

// create the file .env (see after for more information)

$ npm install
$ gulp less
$ pm2 start --name="home-os" src/os/os.js
```


### Development environment

> For development, use vagrant

```javascript

// create the file .env (see after for more information)

$ sudo apt-get install vagrant // you might need to install other dependencies
$ npm install
$ vagrant up
$ vagrant ssh
$ cd jarvis
$ npm start
```

## Env file

Create a file **.env** in the directory of **home-os** project with environment variables:

* NAME: name of the bot (try to use the hostname)
* SLACK_API_TOKEN: token of your slack bot
* SLACK_LOGIN: login to receive slack messages
