<<<<<<< HEAD
// src/service/databaseService.ts
import mysql, { MysqlError } from 'mysql';

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'pocketlist'
=======
import mysql, { MysqlError } from 'mysql';



const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'pocketlist'
>>>>>>> aurelie
};

const connection = mysql.createConnection(connectionConfig);

connection.connect((err: MysqlError | null) => {
<<<<<<< HEAD
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to database with thread ID:", connection.threadId);
});

export default connection;
=======
  if (err) {
    console.log(err.stack);
    return;
  }
  console.log(connection.threadId);
});

export default connection;
>>>>>>> aurelie
