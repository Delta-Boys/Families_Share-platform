const common = require('../common')

const { server } = common
const { chai } = common

const User = require('../../src/models/user')
const Group = require('../../src/models/group')

describe('/Post/api/groups/id/activities/greenPass/required', () => {
    it('after creating an new activity with the "green pass required" field set as true, it should be set correctly', done => {
        try {
            User.findOne({ email: 'test@email.com' }, (error, user) => {
                Group.findOne({ name: 'Test Group 2' }, (err, group) => {
                    const activity = {
                        group_id: group.group_id,
                        creator_id: user.user_id,
                        name: 'Test Activity',
                        color: '#00838F',
                        description: 'test',
                        location: 'Domodossola',
                        repetition: false,
                        repetition_type: 'weekly',
                        different_timeslots: false,
                        greenpass_required: true
                    }
                    const events = []
                    chai
                        .request(server)
                        .post(`/api/groups/${group.group_id}/activities`)
                        .set('Authorization', user.token)
                        .send({ activity, events })
                        .end((err, res) => {
                            res.body.green_pass_required.should.be.eql(activity.greenpass_required)
                            done()
                        })
                    
                })
            })
        } catch (err) {
            throw err
        }
    })
})
describe('/Post/api/groups/id/activities/greenPass/notRequired', () => {
    it('after creating an new activity with the "green pass required" field set as false, it should be set correctly', done => {
        try {
            User.findOne({ email: 'test@email.com' }, (error, user) => {
                Group.findOne({ name: 'Test Group 2' }, (err, group) => {
                    const activity = {
                        group_id: group.group_id,
                        creator_id: user.user_id,
                        name: 'Test Activity',
                        color: '#00838F',
                        description: 'test',
                        location: 'Domodossola',
                        repetition: false,
                        repetition_type: 'weekly',
                        different_timeslots: false,
                        greenpass_required: false
                    }
                    const events = []
                    chai
                        .request(server)
                        .post(`/api/groups/${group.group_id}/activities`)
                        .set('Authorization', user.token)
                        .send({ activity, events })
                        .end((err, res) => {
                            res.body.green_pass_required.should.be.eql(activity.greenpass_required)
                            done()
                        })
                    
                })
            })
        } catch (err) {
            throw err
        }
    })
})
