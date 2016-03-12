angular.module('feelinGit').controller('HomeController', HomeController);

function HomeController($scope, $state, githubService, alchemyService) {

    var commits = null;

    $scope.analyzeLink = function() {
        var link = $scope.inputData.url;
        var elem = link.split("/");
        var owner = elem[elem.length-2];
        var repo = elem[elem.length-1];

        $scope.valid_commits = 0;

        //$scope.sentiments = [];
        $scope.sentiment_counter = {'anger': 0.0, 'joy':0.0, 'fear':0.0, 'sadness':0.0, 'disgust':0.0 };

        githubService.getCommits(owner, repo).then(function(commits) {
            commits = commits.data;
            for (var i = 0; i < commits.length; ++i) {
                alchemyService.getSentiment(commits[i].commit.message).then(function(sentiment) {
                    console.log(sentiment);
                    var status = sentiment.data.status;
                    if (status != "ERROR") {
                      var emotions = sentiment.data.docEmotions;
                      $scope.sentiment_counter['anger'] += parseFloat(emotions['anger']);
                      $scope.sentiment_counter['joy'] += parseFloat(emotions['joy']);
                      $scope.sentiment_counter['fear'] += parseFloat(emotions['fear']);
                      $scope.sentiment_counter['sadness'] += parseFloat(emotions['sadness']);
                      $scope.sentiment_counter['disgust'] += parseFloat(emotions['disgust']);
                      $scope.valid_commits += 1;
                    }
                    //$scope.sentiments.push(sentiment.data.document_tone.tone_categories[0].tones);

                });
            }
        });

    }

}
