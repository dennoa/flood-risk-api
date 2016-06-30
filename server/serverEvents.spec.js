'use strict';

const serverEvents = require('./serverEvents');
const expect = require('chai').expect;

describe('server events', ()=> {

  it('should notify listeners of server startup', ()=> {
    let startupNotified = false;
    let listener = ()=> {
      startupNotified = true;
    };
    serverEvents.onStartup(listener);
    serverEvents.notifyStartup();
    serverEvents.removeStartupListener(listener);
    expect(startupNotified).to.be.true;
  });
});