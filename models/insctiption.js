const mongoose = require("mongoose");

const InscriptionSchema = mongoose.Schema(
  {
    fullname: {
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
