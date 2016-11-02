# home-os

## Getting started

### Production on connected device

> On production environment, yo

Setup your connected device with a standard linux distribution:

* for raspberry pi: see the file setup/raspberry-pi.md
* ...

> You can check if the software layer is operational by using the command `npm start`

```javascript
$ cd ~/home-os
$ npm install
$ gulp less
$ pm2 start --name="home-os" src/os/app.js
$ cd ~/node-smb-server
$ npm install
```


### Development environment

> For development, use vagrant

```javascript
$ sudo apt-get install vagrant // you might need to install other dependencies
$ npm install
$ vagrant up
$ vagrant ssh
$ cd jarvis
$ npm start
```
