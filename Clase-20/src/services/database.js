import mongoose from "mongoose";

const connectionString =  "mongodb://localhost:27017/CoderDB";

export const initMongoDB = async () => {
  try {
    console.log("CONECTANDO A MI DB");
    console.log(connectionString);
    await mongoose.connect(connectionString);

    console.log("YA ESTOY CONECTADO");
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
};
