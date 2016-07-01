'use strict';

const search = require('./search');
const validationRules = require('./search.validationRules');
const Locality = require('./locality.model');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('locality search api', ()=> {

  var req, res, resStatus, resSend, resJson;

  beforeEach(()=> {
    req = { body: {}, checkBody: sinon.stub(), validationErrors: sinon.stub() };
    resSend = sinon.stub();
    resJson = sinon.stub();
    resStatus = sinon.stub().returns({ send: resSend, json: resJson });
    res = { status: resStatus };
    sinon.stub(Locality, 'find');
  });

  afterEach(()=> {
    Locality.find.restore();
  });

  it('should ensure that name has been provided on the request', (done)=> {
    let validationErrors = [{ param: 'locality_name', msg: validationRules.locality_name.errorMessage }];
    req.validationErrors.returns(validationErrors);
    search(req, res).then(()=> {
      expect(req.checkBody).to.have.been.called;
      expect(req.validationErrors).to.have.been.called;
      expect(resStatus.calledWith(400)).to.be.true;
      expect(resJson.calledWith(validationErrors)).to.be.true;
      done();
    });
  });

  it('should find the localities matching the name', (done)=> {
    req.body.locality_name = 'sydney';
    Locality.find.returns({ exec: ()=> { return new Promise((resolve)=> { resolve([]); })}});
    search(req, res).then(()=> {
      expect(req.checkBody).to.have.been.called;
      expect(req.validationErrors).to.have.been.called;
      expect(Locality.find.firstCall.args[0].locality_name).to.be.defined;
      expect(resStatus.calledWith(200)).to.be.true;
      expect(resJson.calledOnce).to.be.true;
      done();
    });
  });

});