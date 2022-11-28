const Workshop = require('../workshop.model');
const mongoose = require('mongoose');
const { expect } = require('chai');

describe ('Workshop', () => {
  it('should throw an error if there is no "name" arg', () => {
    
    const workshop = new Workshop({ name: {}, concert: "12345"})
    workshop.validate(err => {
      expect(err.errors.name).to.exist;
      })
  });

  it('should throw an error if there is no "concert" arg', () => {
    
    const workshop = new Workshop({ name: "Workshop Name", concert: null})
    workshop.validate(err => {
      expect(err.errors.concert).to.exist;
      })
  });

  it('should throw an error if "name " arguments is not a string', () => {
    const cases = [{}, []];
    for(let name of cases) {
      const workshop = new Workshop({ name: name, concert: {}});
      workshop.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
   
  });


  it('should not throw an error if all arg are OK', () => {
    
    const workshop = new Workshop({ name: "Workshop Name", concert: {}});
    workshop.validate(err => {
    expect(err).to.not.exist;
    });
  });


  after(() => {
    mongoose.models = {};
  });
})
