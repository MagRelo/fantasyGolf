/* global Raven:true */
'use strict';

angular.module('fantasyGolfApp')

  //log application errors
  .config(function($provide) {
    $provide.decorator('$exceptionHandler', ['$log', '$delegate',
      function($log, $delegate) {
        return function(exception, cause) {
          $log.debug('Sentry exception handler.');
          Raven.captureException(exception);
          $delegate(exception, cause);
        };
      }
    ]);
  })

  //log http errors
  .factory('errorHttpInterceptor', ['$q', function ($q) {
    return {
      responseError: function responseError(rejection) {
        Raven.captureException(new Error('HTTP response error'), {
          extra: {
            config: rejection.config,
            status: rejection.status
          }
        });
        return $q.reject(rejection);
      }
    };
  }])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('errorHttpInterceptor');
  }]);
