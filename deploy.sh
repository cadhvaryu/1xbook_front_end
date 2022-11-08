echo “Building App…”
npm run build

echo “Deploying file to server…
scp -r build/* root@159.89.167.183:/var/www/html

echo “Done !”