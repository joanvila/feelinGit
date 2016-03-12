angular.module('feelinGit').factory('alchemyService', alchemyService);

function generateAnalyzerURL(message) {
  var BASE_URL = 'http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion?';
  var APIKEY_TAG = 'apikey=';
  var API_KEY = 'd4f4da85c4ad1f47664d8124467f66a683e7e684';
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
        getSentiment: function(commitMessage, author) {
            var q = $q.defer();
            var reqURL = generateAnalyzerURL(commitMessage);
            $http.get(reqURL).then(function(data) {
                data.data.author = author;
                q.resolve(data);
            }, function(err) {
                q.reject(err);
            });

            return q.promise;
        }
    }
}
