angular.module('feelinGit').factory('githubService', githubService);

function generateCommitsURL(owner, repo) {
  var BASE_REPOS_URL = 'https://api.github.com/repos/';
  var COMMITS_SUFFIX = '/commits';
  var SEP = '/';

  return BASE_REPOS_URL + owner + SEP + repo + COMMITS_SUFFIX;
}

function githubService($http, $window,  $q) {

    var SERVER_URL = 'https://api.github.com/repos/joanvila/feelinGit/commits';


    return {
        getCommits: function(owner, repo) {
            var q = $q.defer();
            var reqURL = generateCommitsURL(owner, repo);
            console.log("GITHUB Request URL: "+reqURL);
            $http.get(SERVER_URL).then(function(data) {
                q.resolve(data);
            }, function(err) {
                q.reject(err);
            });

            return q.promise;
        }
    }
}
