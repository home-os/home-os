
sudo apt-get update

# sometimes useful on raspbian for checkout github repositories
sudo apt-get install -y apt-transport-https
sudo apt-get install -y build-essential # always useful

# node js
sudo apt-get install -y nodejs npm
sudo ln -s /usr/bin/nodejs /usr/local/bin/node
sudo ln -s /usr/bin/npm /usr/local/bin/npm

sudo npm install pm2 -g
sudo npm install gulp -g

# git
sudo apt-get install -y git # theorically already done
# git config --global user.name "jarvis"
# git config --global user.email "pi@jarvis"

# mongo
sudo apt-get install -y mongodb-server

# for music
sudo apt-get install -y mpg123
