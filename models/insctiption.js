const mongoose = require("mongoose");

const InscriptionSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 3,
      max: 160,
    },
    lastname: {
      type: String,
      required: true,
      min: 3,
      max: 160,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    trainingId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Inscription = mongoose.model("inscription", InscriptionSchema);

module.exports = Inscription;
