import mongoose from "mongoose";
const connection = {};

// DB connect
const connect = async () => {
  // this condition executes if it is already connected
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  //setting the isConnected key property for connection object if connections in mongoose are greater than zero
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      //if there is one connected connection then use previous (it is like we already connected)
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect(); // if connection is not equal to 1 then we need to disconnect
  }

  const db = await mongoose.connect(process.env.MONGODB_URI); // connect to Database
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
};

// DB disconnect
const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
};

const convertDocToObj = (doc) => {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
};

// Below format is to export two functions as object ex: db.connect, db.disconnect in other files
const db = { connect, disconnect, convertDocToObj };
export default db;
