#/usr/bin/env zsh

rsync -rave "ssh -i MyExpressKey.pem" "$(pwd)/express-demo" ubuntu@ec2-18-220-26-15.us-east-2.compute.amazonaws.com:/home/ubuntu
