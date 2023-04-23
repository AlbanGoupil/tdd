import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

// IMPORTANT : For Mocha working, always use function () {}
// (never () => {})
describe('bookings', function () {
  it('GET /bookings should return a success response with all bookings', function(done){
    chai.request(api)
    .get('/bookings')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data : [
          {
            id: "1",
            item: {
              title: "UML et C++",
              isbn13: "9782744005084",
              authors: "Richard C. Lee, William M. Tepfenhart",
              editor: "CampusPress",
              langCode: "FR",
              price: 29.95
            },
            rentDate: "2022-06-05T22:00:00.000Z",
            returnDate: "2022-08-11T22:00:00.000Z",
            user: {
             id: "12a55zeaz4-88az",
              lastName: "De Monredon",
              firstName: "Simon",
              email: 'simon@gmail.com',
              birthDate: "2000-10-24T22:00:00.000Z",
              phone: "0786189288",
              address: "13 rue de Vibraye"
            }
          },
          {
            id: "2",
            item: {
              title: "UML et C++",
              isbn13: "9782744005084",
              authors: "Richard C. Lee, William M. Tepfenhart",
              editor: "CampusPress",
              langCode: "FR",
              price: 29.95
            },
            rentDate: "2021-06-06T22:00:00.000Z",
            returnDate: "2021-08-12T22:00:00.000Z",
            user: {
              id: "12a55zeaz4-88az",
              lastName: "De Monredon",
              firstName: "Simon",
              email: 'simon@gmail.com',
              birthDate: "2000-10-24T22:00:00.000Z",
              phone: "0786189288",
              address: "13 rue de Vibraye"
            }
          }
        ]
      })
      done()
    })
  })

  it('POST /bookings should create the booking and return a success response with the booking', function(done){
    const booking = {
      id: "3",
      item: {
        title: "Cree su primer sitio web con dreamweaver 8",
        isbn13: "9782746035966",
        authors: "BA GUERIN",
        editor: "ENI",
        langCode: "ES",
        price: 10.02
      },
      rentDate: "2022-03-25T22:00:00.000Z",
      returnDate: "2022-08-19T22:00:00.000Z",
      user: {
        id: "12a55zeaz4-88az",
        lastName: "De Monredon",
        firstName: "Simon",
        email: 'simon@gmail.com',
        birthDate: "2000-10-24T22:00:00.000Z",
        phone: "0786189288",
        address: "13 rue de Vibraye"
      }
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201)
      chai.expect(res.body).to.deep.equal({
        data: {
          id: "3",
          item : {
            title: "Cree su primer sitio web con dreamweaver 8",
            isbn13: "9782746035966",
            authors: "BA GUERIN",
            editor: "ENI",
            langCode: "ES",
            price: 10.02
          },
          rentDate: "2022-03-25T22:00:00.000Z",
          returnDate: "2022-08-19T22:00:00.000Z",
          user: {
            id: "12a55zeaz4-88az",
            lastName: "De Monredon",
            firstName: "Simon",
            email: 'simon@gmail.com',
            birthDate: "2000-10-24T22:00:00.000Z",
            phone: "0786189288",
            address: "13 rue de Vibraye"
          }
        }
      })            
      done()
    })
  })
  it('POST /bookings should return a bad request if no rentdate', function(done){
    const booking = {
      id: "3",
      item: {
        title: "Cree su primer sitio web con dreamweaver 8",
        isbn13: "9782746035966",
        authors: "BA GUERIN",
        editor: "ENI",
        langCode: "ES",
        price: 10.02
      },
      rentDate: "",
      returnDate: "2022-08-19T22:00:00.000Z",
      user: {
        id: "12a55zeaz4-88az",
        lastName: "De Monredon",
        firstName: "Simon",
        email: 'simon@gmail.com',
        birthDate: "2000-10-24T22:00:00.000Z",
        phone: "0786189288",
        address: "13 rue de Vibraye"
      }
    };
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
      error: 'Date de location non renseignée'
      })
      done()
    })
  })
  it('POST /bookings should return a not found if user does not exist', function(done){
    const booking = {
      item:  "9782746035966",
      rentDate: "2023-04-04",
      user: "123456"
    }
    chai.request(api)
    .post('/bookings')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
      error : 'Aucun utilisateur ne correspond à l\'identifiant'
      })
      done()
    })
  })
  it('GET /bookings/:id should return a success response with founded booking', function(done){
    chai.request(api)
    .get('/bookings/1')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data: {
          id: "1",
          item: {
            title: "UML et C++",
            isbn13: "9782744005084",
            authors: "Richard C. Lee, William M. Tepfenhart",
            editor: "CampusPress",
            langCode: "FR",
            price: 29.95
          },
          rentDate: "2022-06-05T22:00:00.000Z",
          returnDate: "2022-08-11T22:00:00.000Z",
          user: {
           id: "12a55zeaz4-88az",
            lastName: "De Monredon",
            firstName: "Simon",
            email: 'simon@gmail.com',
            birthDate: "2000-10-24T22:00:00.000Z",
            phone: "0786189288",
            address: "13 rue de Vibraye"
          }
        }
      })
      done()
    })
  })
  it('GET /bookings/:id should return not found response if the booking does not exist', function(done){
    chai.request(api)
    .get('/bookings/123456')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        "error": "Aucune réservation ne correspond à l'identifiant fourni"
      })
      done()
    })
  })

  /*it('PUT /bookings/:id should update the booking and return a success response with the booking', function(done){
    const booking = {
      id: "1",
      item: {
        title: "UML et C++",
        isbn13: "9782744005084",
        authors: "Richard C. Lee, William M. Tepfenhart",
        editor: "CampusPress",
        langCode: "FR",
        price: 29.95
      },
      rentDate: "2022-06-05T22:00:00.000Z",
      returnDate: "2022-09-13T22:00:00.000Z",
      user: {
       id: "12a55zeaz4-88az",
        lastName: "De Monredon",
        firstName: "Simon",
        email: 'simon@gmail.com',
        birthDate: "2000-10-24T22:00:00.000Z",
        phone: "0786189288",
        address: "13 rue de Vibraye"
      }
    };
    chai.request(api)
    .put('/bookings/1')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body).to.deep.equal({
        data: {
          id: "1",
          item: {
            title: "UML et C++",
            isbn13: "9782744005084",
            authors: "Richard C. Lee, William M. Tepfenhart",
            editor: "CampusPress",
            langCode: "FR",
            price: 29.95
          },
          rentDate: "2022-06-05T22:00:00.000Z",
          returnDate: "2022-09-13T22:00:00.000Z",
          user: {
          id: "12a55zeaz4-88az",
            lastName: "De Monredon",
            firstName: "Simon",
            email: 'simon@gmail.com',
            birthDate: "2000-10-24T22:00:00.000Z",
            phone: "0786189288",
            address: "13 rue de Vibraye"
          }
        }
      })
      done()
    })
  })
  it('PUT /bookings/:id should return a bad request if rentdate is not metnionned', function(done){
    const booking = {
      id: "1",
      item: {
        title: "UML et C++",
        isbn13: "9782744005084",
        authors: "Richard C. Lee, William M. Tepfenhart",
        editor: "CampusPress",
        langCode: "FR",
        price: 29.95
      },
      rentDate: "",
      returnDate: "2022-09-13T22:00:00.000Z",
      user: {
      id: "12a55zeaz4-88az",
        lastName: "De Monredon",
        firstName: "Simon",
        email: 'simon@gmail.com',
        birthDate: "2000-10-24T22:00:00.000Z",
        phone: "0786189288",
        address: "13 rue de Vibraye"
      }
    };
    chai.request(api)
    .put('/bookings/1')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: 'Date de location manquante'
      })
      done()
    })
  })
  it('PUT /bookings/:id should return a bad request if user does not exist', function(done){
    const booking = {
      id: "1",
      item: {
        title: "UML et C++",
        isbn13: "9782744005084",
        authors: "Richard C. Lee, William M. Tepfenhart",
        editor: "CampusPress",
        langCode: "FR",
        price: 29.95
      },
      rentDate: "2022-06-05T22:00:00.000Z",
      returnDate: "2022-09-13T22:00:00.000Z",
      user: {
      id: "12a55zeaz4-88az",
        lastName: "De Monredon",
        firstName: "Simon",
        email: 'simon@gmail.com',
        birthDate: "2000-10-24T22:00:00.000Z",
        phone: "0786189288",
        address: "13 rue de Vibraye"
      }
    };

    chai.request(api)
    .put('/bookings/1')
    .send(booking)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error: 'Aucun utilisateur ne correspond à l\'identifiant fourni'
      })
      done()
    })
  })*/
  it('DELETE /bookings/:id should return not found response if the booking does not exist', function(done){
    chai.request(api)
    .delete('/bookings/3')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        "error" : 'Aucune réservation ne correspond à l\'identifiant fourni'
      })
      done()
    })
  })
});
