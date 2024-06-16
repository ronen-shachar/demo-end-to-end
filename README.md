# Get code
Open terminal and run:
```sh
git clone https://github.com/ronen-shachar/demo-end-to-end.git
```

# Import data
Open terminal and run:
```sh
mongoimport mongodb://127.0.0.1:27017/teslaDB -c cars server/teslaDB.cars.json
```

OR
1. Open Compass
1. Create new database `teslaDB`
1. Create new collection `cars`
1. Import `server/teslaDB.cars.json`

# Install application dependencies
Open terminal and run
```sh
cd server && npm install
```

# Run application
a. Start backend
Run at the directory `server`
```sh
node index.js
```

b. Start frontend
Start Live site on `client/index.html`
