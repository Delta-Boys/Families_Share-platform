const mongoose = require('mongoose')

const inviteSchema = new mongoose.Schema({
  timeslot_id: {
    type: String,
    required: true
  },
  inviter_id: {
    type: String,
    required: true
  },
  invitee_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, { timestamps: true, toJSON: { virtuals: true } })

inviteSchema.index({ invitee_id: 1 })
inviteSchema.index({ timeslot_id: 1, inviter_id: 1, invitee_id: 1 }, { unique: true })
mongoose.pluralize(null)
const model = mongoose.model('Invite', inviteSchema)

module.exports = model
