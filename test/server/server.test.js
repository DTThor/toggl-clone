const request = require('supertest');
const app = require('../../src/server/server');
const Project = require('../../src/server/models/project');
const User = require('../../src/server/models/user');
const TimeEntry = require('../../src/server/models/timeEntry');
const projectSeeds = require('./seeds/projects');
const userSeeds = require('./seeds/users');
const timeEntrySeeds = require('./seeds/timeEntries.js');

describe('/api/users', () => {
  beforeEach(async () => {
    await User.remove();
    await User.insertMany(userSeeds);
  });

  it('should return all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.body.length).toBe(3);
  });

  it('should return a unique user by email', async () => {
    const res = await request(app).get('/api/users/lebron@lakers.com');
    expect(res.body.email).toBe(userSeeds[2].email);
    expect(res.body.name).toBe(userSeeds[2].name);
  });
});

describe('/api/projects', () => {
  beforeEach(async () => {
    await Project.remove();
    await Project.insertMany(projectSeeds);
  });

  it('should respond 200 to GET all projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toBe(200);
  });

  it('should GET all projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.body).toHaveLength(10);
  });

  it('should respond 404 to POST on a bad route', async () => {
    const res = await request(app).post('/api/projects/badpath');
    expect(res.statusCode).toBe(404);
  });

  it('should POST a new project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .send({ number: '11' });
    expect(res.body.number).toBe('11');
  });

  it('should UPDATE a project by Id', async () => {
    const getRes = await request(app).get('/api/projects');
    const id = getRes.body[0]._id; // eslint-disable-line no-underscore-dangle

    const putRes = await request(app)
      .put(`/api/projects/${id}`)
      .send({ name: 'update project name' });
    expect(putRes.body.name).toBe('update project name');
  });

  it('should DELETE a project by Id', async () => {
    const getRes = await request(app).get('/api/projects');
    const id = getRes.body[0]._id; // eslint-disable-line no-underscore-dangle

    const deleteRes = await request(app).delete(`/api/projects/${id}`);
    expect(deleteRes.body.message).toBe('Project deleted!');
  });
});

describe('/api/timeEntries', () => {
  beforeEach(async () => {
    await TimeEntry.remove();
    await TimeEntry.insertMany(timeEntrySeeds);
  });

  it('should get all time entries from the database', async () => {
    const res = await request(app).get('/api/entries');
    expect(res.statusCode).toBe(200);
  });
});
