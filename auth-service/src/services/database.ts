import { createConnection, Connection, getConnectionOptions } from 'typeorm';

export const connectDatabase = async (): Promise<void> => {
	try {
		console.log(__dirname);
		// read connection options from ormconfig file (or ENV variables)
		const connectionOptions = await getConnectionOptions();		

		// create a connection using modified connection options
		const connection = await createConnection(connectionOptions);

		console.log(`Database connected successfully!`);
	} catch(error) {
		console.log(error);
	}
}