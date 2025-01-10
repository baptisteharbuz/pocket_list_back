import mysql, { MysqlError } from 'mysql';



const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'pocketlist'

};

const connection = mysql.createConnection(connectionConfig);

connection.connect((err: MysqlError | null) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to database with thread ID:", connection.threadId);
});

export default connection;
