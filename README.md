# home-os

## Getting started

### Production on connected device

> On production environment, yo

Setup your connected device with a standard linux distribution:

* for raspberry pi: see the file setup/raspberry-pi.md
* ...

> You can check if the software layer is operational by using the command `npm start`




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

### pm2

> On connected device

```javascript
$ pm2 start npm -- start --name="home-os"

```

### vagrant






* https://github.com/jas-/node-libnmap
