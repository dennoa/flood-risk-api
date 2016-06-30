'use strict';

const apiKey = require('./index');
const model = require('./apiKey.model');
const config = require('../../config/environment');
const logger = require('../logger');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('apiKey', ()=> {

  let stubs = {};
  let expectedError = 'Expected for testing';

  beforeEach(()=> {
    stubs.createExec = sinon.stub().returns(new Promise((resolve, reject)=> { resolve(null); }));
    stubs.findExec = sinon.stub().returns(new Promise((resolve, reject)=> { resolve(null); }));
    sinon.stub(model, 'create').returns({ exec: stubs.createExec });
    sinon.stub(model, 'findOne').returns({ exec: stubs.findExec });
    sinon.stub(logger, 'error');
  });

  afterEach(()=> {
    model.create.restore();
    model.findOne.restore();
    logger.error.restore();
  });

  it('should create a new ApiKey', (done)=> {
    let doc = { key: 'my api key' };
    apiKey.create(doc).then(()=> {
      expect(model.create.calledWith(doc)).to.be.true;
      done();
    });
  });

  it('should ensure at least one api key is available', (done)=> {
    apiKey.ensureAtLeastOneApiKeyIsAvailable().then(()=> {
      expect(model.create.calledWith(config.apiKey.default)).to.be.true;
      done();
    });
  });

  it('should not create a default api key if any other key is available', (done)=> {
    stubs.findExec.returns(new Promise((resolve, reject)=> {
      resolve({});
    }));
    apiKey.ensureAtLeastOneApiKeyIsAvailable().then(()=> {
      expect(model.create.called).to.be.false;
      done();
    });
  });

  it('should log an error found when creating a default api key', (done)=> {
    stubs.createExec.returns(new Promise((resolve, reject)=> {
      reject(expectedError);
    }));
    apiKey.ensureAtLeastOneApiKeyIsAvailable().then(()=> {
      var args = logger.error.firstCall.args;
      expect(args[0]).to.equal('Failed to create an api key');
      expect(args[1]).to.equal(expectedError);
      done();
    });
  });

  it('should treat the non-existence of an api key on the request as invalid', (done)=> {
    var req = { get: sinon.stub() };
    apiKey.validate(req).catch(()=> {
      expect(req.get.calledWith('x-iag-api-key')).to.be.true;
      done();
    });
  });

  it('should treat an unknown api key as invalid', (done)=> {
    var myKey = 'my key';
    var req = { get: sinon.stub().returns(myKey) };
    apiKey.validate(req).catch(()=> {
      let args = model.findOne.firstCall.args[0];
      expect(args.key).to.equal(myKey);
      done();
    });
  });

  it('should treat an known api key as valid', (done)=> {
    var myKey = 'my key';
    var req = { get: sinon.stub().returns(myKey) };
    stubs.findExec.returns(new Promise((resolve, reject)=> {
      resolve({});
    }));
    apiKey.validate(req).then(()=> {
      done();
    });
  });

});