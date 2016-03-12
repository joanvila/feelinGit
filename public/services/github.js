angular.module('feelinGit').factory('githubService', githubService);

function generateCommitsURL(owner, repo) {
  var BASE_REPOS_URL = 'https://api.github.com/repos/';
  var COMMITS_SUFFIX = '/commits';
  var SEP = '/';
  var ACCESS_TOKEN_TAG = '?access_token=';

  return BASE_REPOS_URL + owner + SEP + repo + COMMITS_SUFFIX + ACCESS_TOKEN_TAG;
}

function generateLanguagesURL(owner, repo) {
  var BASE_REPOS_URL = 'https://api.github.com/repos/';
  var LANGUAGES_SUFFIX = '/languages';
  var SEP = '/';
  var ACCESS_TOKEN_TAG = '?access_token=';

  return BASE_REPOS_URL + owner + SEP + repo + LANGUAGES_SUFFIX + ACCESS_TOKEN_TAG;
}

function githubService($http, $window,  $q) {

    return {
        getCommits: function(owner, repo) {
            var q = $q.defer();
            var reqURL = generateCommitsURL(owner, repo);
            $http.get('/env').success(function(data) {
               var accessToken = data;
               reqURL += accessToken;
               $http.get(reqURL).then(function(data) {
                   q.resolve(data);
               }, function(err) {
                   q.reject(err);
               });
            });

            return q.promise;
        },
        getLanguages: function(owner, repo) {
            var q = $q.defer();
            var reqURL = generateLanguagesURL(owner, repo);
            $http.get('/env').success(function(data) {
               var accessToken = data;
               reqURL += accessToken;
               $http.get(reqURL).then(function(data) {
                   q.resolve(data);
               }, function(err) {
                   q.reject(err);
               });
            });

            return q.promise;
        }
    }
}
