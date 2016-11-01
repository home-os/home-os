# Raspberry pi

## Install distribution


```javascript

$ wget https://downloads.raspberrypi.org/raspbian_lite_latest -O raspbian.zip
$ unzip raspbian.zip

// find the name of the extracted img file. We called it raspbian.img

$ df -h

// insert SD card

$ df -h

// find the disk by difference. We called it /dev/sdb1

$ umount /dev/sdb1

// umount all new disks /dev/sdb2, /dev/sdb3, extracted

$ dd bs=4M if=raspbian.img of=/dev/sdb

$ sync

// in order to find the ip of the raspberry pi

$ nmap -sn 192.168.1.0/24
```

* https://www.raspberrypi.org/downloads/raspbian/
* https://www.raspberrypi.org/documentation/installation/installing-images/linux.md
* [How to config the raspberry pi](https://www.raspberrypi.org/documentation/configuration/)

## Install software layer

Once the raspbian is accessible, we need to setup the software layer:

```javascript

// for raspberry pi
$ sudo apt-get install git
$ git clone https://github.com/home-os/home-os.git ~/home-os

$ cd ~/jarvis
$ sudo sh ./setup/raspberry-pi.sh

```
