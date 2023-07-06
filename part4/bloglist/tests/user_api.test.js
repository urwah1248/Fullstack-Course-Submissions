const mongoose = require('mongoose')
const app = require('../app')
const api = require('supertest')(app)
const User = require('../models/user')
const listhelper = require('../utils/listhelper')

beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });
  
afterAll(async () => {
    // Close the Mongoose connection after all tests
    await mongoose.connection.close();
});

describe('Adding new Users using, ', () => {

    //Exercise 4.16
    test('Valid Values', async () => {
        const newUser = {
          username: "validuser",
          name: "Valid Name",
          password: "validpassword"
        }
      
        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/);
      
        const returnedUser = await response.body;
        expect(returnedUser.username).toBe(newUser.username);
        expect(returnedUser.name).toBe(newUser.name);
    });

})
