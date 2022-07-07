require("dotenv").config();
const mongoose = require("mongoose");

mongoose
    .connect(
        String(process.env.NODE_ENV).includes("development") ?
            process.env.MONGO_URL_DEV :
            process.env.MONGO_URL_PROD
    )
    .then(() => {
        console.log("🟢 Connection to database success ! ");
    })
    .catch(() => {
        console.log("🔴 Error Connection to database ! ");
    });

module.exports = mongoose;