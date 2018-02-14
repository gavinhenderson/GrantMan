// Authentication testing
// Dependeicies ================================================================
var assert = require('assert');
var authenticate = require('../app/authenticate.js');
var password = require('../app/password.js');

// Mock data ===================================================================
var mockUser = {
  email: 'user@user.com',
  password: 'password', // Hashed before tests
}

var db = {
  User: {
    findOne: (obj) => {
      if (obj.email == mockUser.email) {
        return mockUser;
      }
    },
  },
}

// Tests =======================================================================
describe('Authentication', () => {
  // Password handling =========================================================
  describe('Password bcrypt', () => {
    it('should generate a digest from a string input', () => {
      password.generateHash('password', (err, hash) => {
        assert.ok(hash);
      });
    });

    it ('should verify if a password matches a hash/salt', () => {
      password.generateHash('password', (err, hash) => {
        password.verifyHash('password', hash, (err, res) => {
          assert.ok(res);
        });
      })
    });
  });

  // Login =====================================================================
  describe('Login', () => {
    // Setup mock data
    before(() => {
      return new Promise(resolve => {
        password.generateHash(mockUser.password, (err, hash) => {
          mockUser.password = hash;
          resolve();
        });
      });
    });

    it('should login when provided valid details', () => {
      authenticate(db, "user@user.com", "password", (err, user, message) => {
        // If user is not false, then authentication passed
        assert.ok(user);
      });
    });

    it('should not login when incorrect username provided', () => {
      authenticate(db, "notauser@user.com", "password", (err, user, message) => {
        // If user is false, then authentication passed
        assert.ok(!user);
      });
    });

    it('should not login when incorrect password provided', () => {
      authenticate(db, "user@user.com", "notapassword", (err, user, message) => {
        // If user is false, then authentication passed
        assert.ok(!user);
      })
    })
  });
});
