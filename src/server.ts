import errorHandler from "errorhandler";
import mongoose from "mongoose";
import bluebird from "bluebird";

import { MONGODB_URI } from "./utils/secrets";
import app from "./app";

app.use(errorHandler());

const startServer = () => {
    app.listen(app.get("port"), () => {
        console.log(`App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
        console.log("Press CTRL-C to stop\n");
    });
};

console.log("connecting to mongodb instance");
mongoose.Promise = bluebird;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } )
.then(() => { 
    console.log("connection successfull to mongo server");
    startServer(); 
}).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    process.exit();
});
