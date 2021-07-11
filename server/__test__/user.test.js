/*

Manual testing until I can figure out Jest + Node.js

1.) Curl command to login a user and will save to database if it doesn't already exist
curl --header "Content-Type: application/json" --request POST --data '{"name": "testing do not delete me", "password": "password123", "password2": "password123", "email": "g@gmail.com", "usernames": {"twitter": "asdf"}}' 'http://localhost:3000/user/register'

2.) No password or incorrect password provided, will fail and log error message
curl --header "Content-Type: application/json" --request POST --data '{"email": "g@gmail.com"}' 'http://localhost:3000/user/login'
curl --header "Content-Type: application/json" --request POST --data '{"email": "g@gmail.com", "password": "12"}' 'http://localhost:3000/user/login'

3.) Password provided, will succeed and log success message and update last login date and time in database
curl --header "Content-Type: application/json" --request POST --data '{"email": "g@gmail.com", "password": "password123"}' 'http://localhost:3000/user/login'

4.) User log out
curl 'http://localhost:3000/user/logout'
*/



const faker = require('faker');
const request = require('supertest');
// const app = require('../index');

const user = {
  name: 'testing testing',
  password: 'password123',
  password2: 'password123',
  email: '2@gmail.com',
  usernames: {
    twitter: "hello",
    youtube: "hello"
  }
}

xdescribe('Authentication routes', () => {
  var server;
  var agent;

  beforeEach((done) => {
    server = app.listen(5000, (err) => {
      if (err) return done(err);
      agent = request.agent(server);
      done();
    });
  });

  afterEach((done) => {
    return server.close(done);
  });

  describe('Register', () => {
    test('should return 200 if all fields are correct and not already in db', async () => {
      const response = await request(app).post('/user/register').send(user);
      expect(response.statusCode).toBe(200);
    });

    test('should return 403 if email already exists', async () => {
      const response = await request(app).post('/user/register').send(user);
      expect(response.statusCode).toBe(403);
      expect(response.body).toBeDefined();
    });
  });

  describe('Login', () => {

    test('should return 200 and session if email and password are correct', () => {

    });

    test('should return 403 if email or password are incorrect', () => {

    });
  });
});