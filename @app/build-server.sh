#! /usr/bin/bash
cd @app/client 
npm run build

sudo cp -r build/* /var/www/html/
