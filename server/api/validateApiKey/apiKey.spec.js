'use strict';

const apiKey = require('./index');
const apiKeyComponent = require('../../components/apiKey');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('apiKey middleware', ()=> {

  var req, res, next, resStatus, resSend;

  beforeEach(()=> {
    req = {};
    resSend = sinon.stub();
    resStatus = sinon.stub().returns({ send: resSend });
    res = { status: resStatus };
    next = sinon.stub();
    sinon.stub(apiKeyComponent, 'validate');
  });

  afterEach(()=> {
    apiKeyComponent.validate.restore();
  });

  it('should allow access for valid api keys', (done)=> {
    apiKeyComponent.validate.returns(new Promise((resolve, reject)=> { resolve(); }));
    apiKey(req, res, next).then(()=> {
      expect(next).to.have.been.called;
      done();
    });
  });

  it('should deny access for invalid api keys', (done)=> {
    apiKeyComponent.validate.returns(new Promise((resolve, reject)=> { reject(); }));
    apiKey(req, res, next).then(()=> {
      expect(resStatus.calledWith(401)).to.be.true;
      expect(resSend).to.have.been.called;
      expect(next).not.to.have.been.called;
      done();
    });
  });

});