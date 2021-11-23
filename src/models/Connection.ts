import 'dotenv/config';
import { MongoClient } from 'mongodb';

class Connection {
  private URL: string;
  private dbName : string;

  constructor() {
    this.URL = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017';
    this.dbName = process.env.MONGO_DB || 'Users';
  }

  public async connection() {
    return MongoClient.connect(this.URL)
      .then((connection) => connection.db(this.dbName))
      .catch((error) => {
        console.error(error);
        process.exit();
      });
  }

}

export default Connection;
