var assert = require('assert');
var account = require('../app/account.js');

var mockUser = {
  name: "Bobby",
  type: "RIS",
  id: Math.floor((Math.random() * 999999)),
  password: 'pass',
  school: 'the world',
  email: 'bobby@dundee.ac.uk'
}

describe('Accounts',function(){
    it('Creating account',function(done){
      account.createUser(mockUser,function(model){
        assert.equal(model.staffID, mockUser.id);
        assert.equal(model.email, mockUser.email);
        assert.equal(model.type, mockUser.type);
        assert.equal(model.name, mockUser.name);
        assert.equal(model.school, mockUser.school);
        done()
      })
    })
})
