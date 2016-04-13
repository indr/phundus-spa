'use strict';

// http://www.frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/

(function () {
  angular.module('ph.auth')
    .factory('Auth', Auth);

  Auth.$inject = ['$http', '$cookies', '_', 'auth'];
  function Auth($http, $cookies, _, auth) {

    var accessLevels = auth.accessLevels
      , userRoles = auth.userRoles
      , currentUser = $cookies.getObject('ph.user') || {username: '', role: userRoles.public}
      , currentMembership = _.find(currentUser.memberships, {selected: true});

    updateCurrentUserRoleBitMask();

    function changeUser(user) {
      angular.extend(currentUser, user);
      currentMembership = _.find(user.memberships, {selected: true});
      updateCurrentUserRoleBitMask();
    }

    function changeMembership(membership) {
      _.forEach(currentUser.memberships, function (each) {
        each.selected = each === membership;
      });
      currentMembership = membership;
      updateCurrentUserRoleBitMask();
    }

    function updateCurrentUserRoleBitMask() {
      if (!currentMembership) {
        return;
      }
      var bitMask = userRoles.manager.bitMask;
      if (currentMembership.isManager) {
        currentUser.role.bitMask = currentUser.role.bitMask | bitMask;
      }
      else {
        currentUser.role.bitMask = currentUser.role.bitMask & ~bitMask;
      }
    }

    function getMemberRole(organizationId) {
      if (!organizationId) {
        return 0;
      }
      var membership = _.find(currentUser.memberships, {organizationId: organizationId});

      if (membership && membership.isManager) {
        return userRoles.manager.bitMask;
      }
      return 0;
    }

    return {
      authorize: function (accessLevel, userRole, organizationId) {
        if (userRole === undefined) {
          userRole = currentUser.role;
        }
        return accessLevel.bitMask & (userRole.bitMask | getMemberRole(organizationId));
      },
      isLoggedIn: function (user) {
        if (user === undefined) {
          user = currentUser;
        }
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      isManager: function (organizationId, user) {
        if (user === undefined) {
          user = currentUser;
        }
        return user.memberships && user.memberships.some(function (each) {
            return each.organizationId === organizationId && each.isManager;
          });
      },
      isMember: function (organizationId, user) {
        if (user === undefined) {
          user = currentUser;
        }
        return user.memberships && user.memberships.some(function (each) {
            return each.organizationId === organizationId;
          });
      },
      login: function (user, success, error) {
        $http.post('/api/v0/sessions', {
          "username": user.username,
          "password": user.password,
          "rememberme": user.rememberme
        }).success(function (data) {
          $cookies.putObject('ph.user', data, {secure: false});
          changeUser(data);
          success(data);
        }).error(error);
      },
      logout: function (success, error) {
        $cookies.remove('ph.user');
        $http.delete('/api/v0/sessions').success(function () {
          changeUser({
            memberships: undefined,
            username: '',
            role: userRoles.public
          });
          success();
        }).error(error);
      },
      select: function (membership, success, error) {
        changeMembership(membership);
        $http.get('/organization/select/' + membership.organizationId).success(function (data) {
          if (success) {
            success(data)
          }
        }).error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  }
})();
