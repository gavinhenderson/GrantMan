// Authentication testing
var assert = require('assert');
var authenticate = require('../app/authenticate.js');

// TODO: Change tests for database
describe('Authentication', () => {
  describe('Login', () => {
    it('should login when provided valid details', () => {
      authenticate("user@user.com", "pass", (err, user, message) => {
        // If user is not false, then authentication passed
        assert.ok(user);
      });
    });

    it('should not login when incorrect details provided', () => {
      authenticate("notauser@user.com", "pass", (err, user, message) => {
        // If user is false, then authentication passed
        assert.ok(!user);
      });
    });
  });
});
