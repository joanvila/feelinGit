angular.module('feelinGit').factory('alchemyService', alchemyService);

function generateAnalyzerURL(message) {
  //http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion?apikey=12d920bcbae54921e96e85c9b8011ab658dc8b07&text=asfhagf&outputMode=json
  var BASE_URL = 'http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion?';
  var APIKEY_TAG = 'apikey=';
  var API_KEY = 'd4646bea2eb5c3ea27365e97c527f73248224c1c';
  var TEXT_TAG = 'text=';
  var AMP = "&";
  var OUTPUT_TAG = 'outputMode=';
  var OUTPUT = 'json';
  var SPACE = '%20';
  var SOURCE_TAG = 'showSourceText=';
  var SOURCE = 1;

  message = message.replace(/ /g, SPACE);
  return BASE_URL + APIKEY_TAG + API_KEY + AMP + OUTPUT_TAG + OUTPUT + AMP + TEXT_TAG + message + AMP + SOURCE_TAG + SOURCE;
}
function alchemyService($http, $window,  $q) {

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
