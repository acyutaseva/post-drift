#! /usr/bin/bash
cd @app/server

pm2 start dist/main.js --name "post-drift-server"