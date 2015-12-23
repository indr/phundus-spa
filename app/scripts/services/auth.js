'use strict';

angular.module('phundusApp')
  .factory('Auth', ['$http', '$cookies', '_', function ($http, $cookies, _) {

    var accessLevels = window.routingConfig.accessLevels
      , userRoles = window.routingConfig.userRoles
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

    return {
      authorize: function (accessLevel, role) {
        if (role === undefined) {
          role = currentUser.role;
        }

        return accessLevel.bitMask & role.bitMask;
      },
      isLoggedIn: function (user) {
        if (user === undefined) {
          user = currentUser;
        }
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
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
  }]);
