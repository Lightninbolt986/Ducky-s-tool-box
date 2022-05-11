const mongoose = require(`mongoose`);
const profileSchema = new mongoose.Schema({
  userID: {
    type: String,
    require: true,
    unique: true,
  },
  warns: {
    type: Array,
  },
});

const model = mongoose.model(`DZProileModels`, profileSchema);

module.exports = model;
