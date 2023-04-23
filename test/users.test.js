import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

// IMPORTANT : For Mocha working, always use function () {}
// (never () => {})
describe('Users', function () {
  it('GET /users should return a success response with all users', function (done) {
    chai.request(api)
    .get('/users')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: [
          {
            id: '12a55zeaz4-88az',
            firstName: 'Simon',
            lastName: 'De Monredon',
            birthDate: '2000-10-24T22:00:00.000Z',
            email: 'simon@gmail.com',
            phone: '0786189288',
            address: '13 rue de Vibraye'
          },
          {
            id: 'ajzje4482zea9284z-529a2ze',
            firstName: 'Valentin',
            lastName: 'Leroux',
            birthDate: '2001-08-21T22:00:00.000Z',
            email: 'valou@gmail.com',
            phone: '0123456789',
            address: 'Chateau de glaix Cherreau'
          },
        ]
      });
      done();
    });
  });
  it('POST /users should create the user and return a success response with the user', function (done) {
    const user = {
      id: '12a55zeaz4-88az',
      firstName: 'Thierry',
      lastName: 'De Guyenne',
      birthDate: '1990-10-25T22:00:00.000Z',
      email: 'titi@gmail.com',
      phone: '0147859623',
      address : '13 rue des chataingner'
    };
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201);
      chai.expect(res.body).to.deep.equal({
        data: user
      });
      done();
    });
  });
  it('POST /users should return a bad request if email malformed', function (done) {
    const user = {
      id: '12a55zeaz4-88az',
      firstName: 'Thierry',
      lastName: 'De Guyenne',
      birthDate: '1990-10-25',
      email: 'titigmail.com',
      phone: '0147859623',
      address : '13 rue des chataingner'
    };
    chai.request(api)
      .post('/users')
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res.body).to.deep.equal({
          error: {
            message: `Email incorrect`
          }
        });
        done();
      });
  });
  it('GET /users/:id should return a success response with found user', function (done) {
    chai.request(api)
    .get('/users/12a55zeaz4-88az')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          id: '12a55zeaz4-88az',
          firstName: 'Simon',
          lastName: 'De Monredon',
          email: 'simon@gmail.com',
          phone: '0786189288',
          address: '13 rue de Vibraye',
          birthDate: '2000-10-24T22:00:00.000Z',
        }
      });
      done();
    });
  });
  it('GET /users/:id should return not found response if the book does not exists', function (done) {
    chai.request(api)
    .get('/users/123456789')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 123456789 not found'
      });
      done();
    });
  });
  it('PUT /users/:id should return a success response with found user', function (done) {
    const user = {
      id: '12a55zeaz4-88az',
      firstName: 'Thierry',
      lastName: 'De Guyenne',
      birthDate: '1990-10-25',
      email: 'thierry@gmail.com',
      phone: '0147859623',
      address : '13 rue des chataingner'
    };
    chai.request(api)
    .put('/users/12a55zeaz4-88az')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          id: '12a55zeaz4-88az',
          firstName: 'Thierry',
          lastName: 'De Guyenne',
          birthDate: '1990-10-25',
          email: 'thierry@gmail.com',
          phone: '0147859623',
          address : '13 rue des chataingner'
        }
      });
      done();
    });
  });
  it('PUT /users/:id should return not found response if the user does not exists', function (done) {
    const user = {
      id: '12a55ze22',
      firstName: 'Thierry',
      lastName: 'De Guyenne',
      birthDate: '1990-10-25',
      email: 'thierry@gmail.com',
      phone: '0147859623',
      address : '13 rue des chataingner'
    };
    chai.request(api)
    .put('/users/12a55ze22')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 12a55ze22 not found'
      });
      done();
    });
  });
  it('PUT /users/:id : should return a bad request if email malformed', function (done) {
    const updatedUser = {
      id: '12a55ze22',
      firstName: 'Thierry',
      lastName: 'De Guyenne',
      birthDate: '1990-10-25',
      email: 'thierrygmail.com',
      phone: '0147859623',
      address : '13 rue des chataingner'
    };
    chai.request(api)
      .put('/users/12a55ze22')
      .send(updatedUser)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res.body).to.deep.equal({
          error: {
            message: `Email incorrect`
          }
        });
        done();
      });
  });
  it('DELETE /users/:id should return a success response', function (done) {
    chai.request(api)
    .delete('/users/12a55zeaz4-88az')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          _deleted: {
            id: '12a55zeaz4-88az',
            firstName: 'Thierry',
            lastName: 'De Guyenne',
            email: 'thierry@gmail.com',
            phone: '0147859623',
            birthDate: '1990-10-25',
            address: '13 rue des chataingner',
          }
        }
      });
      done();
    });
  });
  it('DELETE /users/:id should return not found response if the user does not exists', function (done) {
    chai.request(api)
    .delete('/users/235')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User 235 not found'
      });
      done();
    });
  });
});
