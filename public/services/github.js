angular.module('feelinGit').factory('githubService', githubService);

function generateCommitsURL(owner, repo) {
  var BASE_REPOS_URL = 'https://api.github.com/repos/';
  var COMMITS_SUFFIX = '/commits';
  var SEP = '/';
  var ACCESS_TOKEN_TAG = '?access_token=';
  var ACCESS_TOKEN = '106392fb2de05d2f04b9eb4f76285b62134c75ed';

  return BASE_REPOS_URL + owner + SEP + repo + COMMITS_SUFFIX + ACCESS_TOKEN_TAG + ACCESS_TOKEN;
}

function githubService($http, $window,  $q) {


    return {
        getCommits: function(owner, repo) {
            var q = $q.defer();
            var reqURL = generateCommitsURL(owner, repo);
            console.log("GITHUB Request URL: "+reqURL);
            $http.get(reqURL).then(function(data) {
                q.resolve(data);
            }, function(err) {
                q.reject(err);
            });

            return q.promise;
        }
    }
}
