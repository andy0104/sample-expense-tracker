require('reflect-metadata');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	"type": process.env.DB_TYPE,
	"host": process.env.DB_HOST,
	"port": process.env.DB_PORT,
	"username": process.env.DB_USERNAME,
	"password": process.env.DB_PASSWORD,
	"database": process.env.DB_NAME,
	"entities": [
		__dirname + '/src/entity/*.ts'
	],
	"migrations": [
	  __dirname + '/src/migration/*.ts'
	],
	"subscribers": [
	  __dirname + '/src/subscriber/*.ts'
	],
	"migrationsTableName": 'migrations',
	"cli": { 
	  "migrationsDir": __dirname + '/src/migration',
	},
	"synchronize": false
};