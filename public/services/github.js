angular.module('feelinGit').factory('githubService', githubService);

function githubService($http, $window,  $q) {

    var SERVER_URL = 'https://api.github.com/repos/joanvila/feelinGit/commits';

    return {
        getCommits: function() {
            var q = $q.defer();
            $http.get(SERVER_URL).then(function(data) {
                q.resolve(data);
            }, function(err) {
                q.reject(err);
            });
            
            return q.promise;
        }
    }
}
