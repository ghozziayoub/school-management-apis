const mongoose = require("mongoose")

mongoose
    .connect("mongodb://localhost:27017")
    .then(() => { console.log("Connection to database success ! "); })
    .catch(() => { console.log("Error Connection to database ! "); })

module.exports = mongoose