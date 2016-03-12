angular.module('feelinGit').factory('alchemyService', alchemyService);

function alchemyService($http, $window,  $q) {

    var SERVER_URL = 'http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment';

    return {
        getSentiment: function(commitMessage) {
            var q = $q.defer();
            $http.get(SERVER_URL, {
                apikey: '770078878d0540dc544058a6d0685b6f3012aebc',
                text: commitMessage,
                outputMode: 'json'
            }).then(function(data) {
                q.resolve(data);
            }, function(err) {
                q.reject(err);
            });

            return q.promise;
        }
    }
}
