angular.module('feelinGit').factory('alchemyService', alchemyService);

function generateAnalyzerURL(message) {
  var BASE_URL = 'https://watson-api-explorer.mybluemix.net/tone-analyzer-beta/api/v3/tone?';
  var VERSION_TAG = 'version=';
  var TEXT_TAG = 'text=';
  var AMP = "&";
  var TONE_VERSION = '2016-02-11';
  var SPACE = '%20';
  message = message.replace(/ /g, SPACE);
  return BASE_URL + VERSION_TAG + TONE_VERSION + AMP + TEXT_TAG + message;
}
function alchemyService($http, $window,  $q) {

    var SERVER_URL = 'http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment';

    return {
        getSentiment: function(commitMessage) {
            var q = $q.defer();
            var reqURL = generateAnalyzerURL(commitMessage);
            $http.get(reqURL).then(function(data) {
                q.resolve(data);
            }, function(err) {
                q.reject(err);
            });

            return q.promise;
        }
    }
}
