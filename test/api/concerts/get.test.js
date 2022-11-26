const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  
  before (async () => {
    const concertOne = new Concert({ 
      _id: '5d9f1140f10a81216cfd4408',    
      performer: 'PerformerOne',
      genre: 'pop',
      price: 32,
      day: 1,
      image: '/image1.jpg' 
      })
    await concertOne.save()
    

    const concertTwo = new Concert({ 
      _id: '5d9f1140f10a81216cfd5555',    
      performer: 'PerformerTwo',
      genre: 'rock',
      price: 22,
      day: 1,
      image: '/image2.jpg' 
      })
    await concertTwo.save()
  });


  it ('/concerts should return all concerts', async () => {
    
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    
  })

  it ('/concerts/:id should return one concert by :id', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  })

  it ('/concerts/performer/:performer should return all concerts by :performer', async () => {
    const res = await request(server).get('/api/concerts/performer/PerformerOne');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  })

  it ('/concerts/genre/:genre should return all concerts by :genre', async () => {
    const res = await request(server).get('/api/concerts/genre/pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  })

  it ('/concerts/price/day/:day should return all concerts by :day', async () => {
    const res = await request(server).get('/api/concerts/price/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  })

  it ('/concerts/price/:price_min/:price_max should return all concert by :price_min/:price_max', async () => {
    const res = await request(server).get('/api/concerts/price/20/25');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  })


  after(async () => {
    await Concert.deleteMany();
  });
});
