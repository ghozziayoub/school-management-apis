require("dotenv").config();
const mongoose = require("mongoose");

mongoose
    .connect(
        process.env.NODE_ENV === "development" ?
            process.env.MONGO_URL_DEV :
            process.env.MONGO_URL_PROD ||
            "mongodb://admin:azerty1234%40@102.219.178.96:27017/school-management?authMechanism=SCRAM-SHA-1&authSource=admin"
    )
    .then(() => {
        console.log("🟢 Connection to database success ! ");
    })
    .catch(() => {
        console.log("🔴 Error Connection to database ! ");
    });

module.exports = mongoose;