const Workshop = require('../workshop.model');
const mongoose = require('mongoose');
const { expect } = require('chai');

describe ('Workshop', () => {
  it('should throw an error if there is no "name" arg', () => {
    
    const workshop = new Workshop({ name: {}, concertId: "12345"})
    workshop.validate(err => {
      expect(err.errors.name).to.exist;
      })
  });

  it('should throw an error if there is no "concertId" arg', () => {
    
    const workshop = new Workshop({ name: "Workshop Name", concertId: {}})
    workshop.validate(err => {
      expect(err.errors.concertId).to.exist;
      })
  });

  it('should throw an error if even one of arguments is not a string', () => {
    const cases = [{}, []];
    for(let name of cases) {
      const workshop = new Workshop({ name: name, concertId: "12345"});
      workshop.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
    for(let concertId of cases) {
      const workshop = new Workshop({name: "Workshop Name", concertId: concertId});
      workshop.validate(err => {
        expect(err.errors.concertId).to.exist;
      });
    }
  });

  it('should not throw an error if all arg are OK', () => {
    
    const workshop = new Workshop({ name: "Workshop Name", concertId: "12345"});
    workshop.validate(err => {
    expect(err).to.not.exist;
    });
  });




  after(() => {
    mongoose.models = {};
  });
})
