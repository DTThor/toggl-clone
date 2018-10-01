const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  task: String,
  billable: Boolean,
  categories: [{ _id: String, name: String }],
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  timeStart: Date,
  timeEnd: Date,
  userId: String,
});

module.exports = mongoose.model('TimeEntry', schema);
