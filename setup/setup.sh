sudo apt-get install -y apt-transport-https
sudo apt-get install -y nodejs npm
sudo ln -s /usr/bin/nodejs /usr/local/bin/node
sudo ln -s /usr/bin/npm /usr/local/bin/npm
sudo apt-get install -y git build-essential
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org mpg123

sudo npm install pm2 -g
