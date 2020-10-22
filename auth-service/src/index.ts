import express from 'express';
import "reflect-metadata";
import { createConnection, Connection } from 'typeorm';
import 'express-async-errors';
import { json } from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

// import database connection function
// import { connectDatabase } from './services/database';

import { User } from './entity/User';

// import middlewares
import { errorMiddleware } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

// import routers
import Auth from './routes/auth';

// import the environment variables
dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();
app.use(json());
app.use(morgan('dev'));

// declare the routes
app.use('/api/auth', Auth);

app.all('*', () => {
	throw new NotFoundError();
});

// declare the middlewares
app.use(errorMiddleware);

app.listen(PORT, async () => {
  // connectDatabase();
  try {
    const connection: Connection = await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "expense_tracker",
      entities: [
        User,
      ], //__dirname + "src/entity/**/*.ts" //__dirname + "src/entity/*{.js,.ts}"
      migrations: [
        __dirname + "src/migration/*.ts"
      ],
      subscribers: [
        __dirname + "src/subscriber/*.ts"
      ],
      migrationsTableName: "migrations",
      cli: { 
        "migrationsDir": __dirname + "src/migration" 
      },
      synchronize: false
    });
    console.log('Database is connected...');    
  } catch(error) {
    console.log('Error connecting to database...');    
    console.error(error);
  }
	console.log(`Auth service listening on PORT ${PORT}`);
});

