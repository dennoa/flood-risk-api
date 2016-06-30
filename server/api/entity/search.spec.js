'use strict';

const search = require('./search');
const validationRules = require('./search.validationRules');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('entity search api', ()=> {

  var req, res, resStatus, resSend, resJson;

  beforeEach(()=> {
    req = { body: {}, checkBody: sinon.stub(), validationErrors: sinon.stub() };
    resSend = sinon.stub();
    resJson = sinon.stub();
    resStatus = sinon.stub().returns({ send: resSend, json: resJson });
    res = { status: resStatus };
  });

  it('should ensure that todo has been provided on the request', (done)=> {
    let validationErrors = [{ param: 'todo', msg: validationRules.todo.errorMessage }];
    req.validationErrors.returns(validationErrors);
    search(req, res).then(()=> {
      expect(req.checkBody).to.have.been.called;
      expect(req.validationErrors).to.have.been.called;
      expect(resStatus.calledWith(400)).to.be.true;
      expect(resJson.calledWith(validationErrors)).to.be.true;
      done();
    });
  });

  it('should find the data', (done)=> {
    req.body.todo = 'some value';
    search(req, res).then(()=> {
      expect(req.checkBody).to.have.been.called;
      expect(req.validationErrors).to.have.been.called;
      expect(resStatus.calledWith(200)).to.be.true;
      expect(resJson.calledOnce).to.be.true;
      done();
    });
  });

});