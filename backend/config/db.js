import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const URI = process.env.MONGO_URI;

async function connectToMongoDB() {

  async function connectionHandler() {
      try {
          await mongoose.connect(URI);            
          return true;
      }
      catch (error) {
          console.error("Connection to DB failed");
          console.error(error);
          return false;
      };
  };

  const connectionResult = await connectionHandler();
  
  connectionResult ? console.log("Connection to DB established"): process.exit(1);
}

export default connectToMongoDB;
