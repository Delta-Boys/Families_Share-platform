const common = require('../common')
const User = require('../../src/models/user')
const Group = require('../../src/models/group')
const Child = require('../../src/models/child')
const ActivityRequest = require('../../src/models/activity-request')
const { child } = require('supervisor')

const { server } = common
const { chai } = common

describe('/Post/api/groups/id/activityrequests', () => {
  it('it should post a new activityRequest when user is authenticated and group member', async (done) => {
    const user = await User.findOne({ email: 'test@email.com' })
    const group = await Group.findOne({ name: 'Test Group Edit' })
    const child = await Child.findOne({
      given_name: 'Test',
      family_name: 'Child'
    })
    const activityReq = {
      name: 'Test Activity Request',
      description: 'Test Description',
      color: '#a31ec9',
      children: [child],
      date: '2020-01-01',
      startTime: '10:00',
      endTime: '11:00'

    }
    chai
      .request(server)
      .post(`/api/groups/${group.group_id}/activityrequests`)
      .set('Authorization', user.token)
      .send({ activityReq })
      .end((err, res) => {
        res.should.have.status(200)
        done()
      })
  })
})

describe('/Get/api/groups/id/activityrequests', () => {
  it('it should get all activityRequests when user is authenticated and group member', async (done) => {
    const user = await User.findOne({ email: 'test@email.com' })
    const group = await Group.findOne({ name: 'Test Group Edit' })

    chai
      .request(server)
      .get(`/api/groups/${group.group_id}/activityrequests`)
      .set('Authorization', user.token)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array').with.lengthOf(1)
        done()
      })
  })
})

describe('/Get/api/groups/groupId/activityrequests/activityReqId', () => {
  it('it should fetch a groups activityReq when user is authenticated and group member', async () => {
    try {
      const user = await User.findOne({ email: 'test@email.com' })
      const group = await Group.findOne({ name: 'Test Group Edit' })
      const activity = await ActivityRequest.findOne({ name: 'Test Activity Request' })
      const res = await chai
        .request(server)
        .get(`/api/groups/${group.group_id}/activityrequests/${activity.activity_id}`)
        .set('Authorization', user.token)
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('name')
      res.body.should.have.property('description')
      res.body.should.have.property('color')
      res.body.should.have.property('children')
      res.body.should.have.property('date')
      res.body.should.have.property('startTime')
      res.body.should.have.property('endTime')

      res.body.name.should.equal('Test Activity Request')
      res.body.description.should.equal('Test Description')
      res.body.color.should.equal('#a31ec9')
      res.body.children.should.be.a('array').with.lengthOf(1)
      res.body.date.should.equal('2020-01-01')
      res.body.startTime.should.equal('10:00')
      res.body.endTime.should.equal('11:00')
    } catch (err) {
      throw err
    }
  })
})

describe('/Patch/api/groups/groupId/activityrequests/activityReqId', () => {
  it('it should update a groups activityReq when user is authenticated and group member', async () => {
    try {
      const user = await User.findOne({ email: 'test@email.com' })
      const group = await Group.findOne({ name: 'Test Group Edit' })
      const activity = await ActivityRequest.findOne({ name: 'Test Activity Request' })
      const child = await Child.findOne({
        given_name: 'Test',
        family_name: 'Child'
      })

      const res = await chai
        .request(server)
        .patch(`/api/groups/${group.group_id}/activityrequests/${activity.activity_id}`)
        .set('Authorization', user.token)
        .send({
          name: 'Test Activity Request Updated',
          description: 'Test Description Updated',
          color: '#360303',
          children: [child],
          date: '2020-01-01',
          startTime: '16:00',
          endTime: '17:00'
        })
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('name')
      res.body.should.have.property('description')
      res.body.should.have.property('color')
      res.body.should.have.property('children')
      res.body.should.have.property('date')
      res.body.should.have.property('startTime')
      res.body.should.have.property('endTime')

      res.body.name.should.equal('Test Activity Request Updated')
      res.body.description.should.equal('Test Description Updated')
      res.body.color.should.equal('#360303')
      res.body.children.should.be.a('array').with.lengthOf(0)
      res.body.date.should.equal('2020-01-01')
      res.body.startTime.should.equal('16:00')
      res.body.endTime.should.equal('17:00')
    } catch (err) {
      throw err
    }
  })
})

describe('/Delete/api/groups/groupId/activityrequests/activityReqId', () => {
  it('it should delete a groups activityReq when user is authenticated and group member', async () => {
    try {
      const user = await User.findOne({ email: 'test@email.com' })
      const group = await Group.findOne({ name: 'Test Group Edit' })
      const activityRequest = await ActivityRequest.findOne({ name: 'Test Activity Request' })
      const res = await chai
        .request(server)
        .delete(`/api/groups/${group.group_id}/activityrequests/${activityRequest.activity_id}`)
        .set('Authorization', user.token)
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('message')
      res.body.message.should.equal('Activity Deleted')
    } catch (err) {
      throw err
    }
  })
})
