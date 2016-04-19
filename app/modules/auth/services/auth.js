(function () {
  'use strict';

  angular.module('ph.auth')
    .provider('auth', auth);

  var config = {
    /* List all the roles you wish to use in the app
     * You have a max of 31 before the bit shift pushes the accompanying integer out of
     * the memory footprint for an integer
     */
    roles: [
      'public',
      'user',
      'manager',
      'admin'],

    /*
     Build out all the access levels you want referencing the roles listed above
     You can use the "*" symbol to represent access to all roles.

     The left-hand side specifies the name of the access level, and the right-hand side
     specifies what user roles have access to that access level. E.g. users with user role
     'user' and 'admin' have access to the access level 'user'.
     */
    accessLevels: {
      'public': "*",
      'anon': ['public'],
      'user': ['user', 'manager', 'admin'],
      'manager': ['manager', 'admin'],
      'admin': ['admin']
    }
  };

  var userRoles = buildRoles(config.roles);
  var accessLevels = buildAccessLevels(config.accessLevels, userRoles);

  function auth() {
    return {
      $get: $get,
      accessLevels: accessLevels,
      userRoles: userRoles
    };
  }

  function $get() {
    return {
      accessLevels: accessLevels,
      userRoles: userRoles
    }
  }

  /*
   Method to build a distinct bit mask for each role
   It starts off with "1" and shifts the bit to the left for each element in the
   roles array parameter
   */
  function buildRoles(roles) {

    var bitMask = "01";
    var userRoles = {};

    for (var role in roles) {
      var intCode = parseInt(bitMask, 2);
      userRoles[roles[role]] = {
        bitMask: intCode,
        title: roles[role]
      };
      bitMask = (intCode << 1 ).toString(2)
    }

    return userRoles;
  }

  /*
   This method builds access level bit masks based on the accessLevelDeclaration parameter which must
   contain an array for each access level containing the allowed user roles.
   */
  function buildAccessLevels(accessLevelDeclarations, userRoles) {

    var accessLevels = {};
    for (var level in accessLevelDeclarations) {

      var role, resultBitMask;
      if (typeof accessLevelDeclarations[level] === 'string') {
        if (accessLevelDeclarations[level] === '*') {

          resultBitMask = '';

          for (role in userRoles) {
            resultBitMask += "1"
          }
          //accessLevels[level] = parseInt(resultBitMask, 2);
          accessLevels[level] = {
            bitMask: parseInt(resultBitMask, 2)
          };
        }
        else {
          console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'")
        }

      }
      else {
        resultBitMask = 0;
        for (role in accessLevelDeclarations[level]) {
          if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role])) {
            resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask
          }
          else {
            console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'")
          }
        }
        accessLevels[level] = {
          bitMask: resultBitMask
        };
      }
    }

    return accessLevels;
  }
})();
