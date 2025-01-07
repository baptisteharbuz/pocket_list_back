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
    console.log(err.stack);
    return;
  }
  console.log(connection.threadId);
});

export default connection;
