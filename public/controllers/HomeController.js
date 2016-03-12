angular.module('feelinGit').controller('HomeController', HomeController);

function HomeController($scope, $state, githubService, alchemyService) {

    var commits = null;

    $scope.valid_commits = 0;

    $scope.sentiment_counter = {
        anger: 0,
        disgust: 0,
        fear: 0,
        joy: 0,
        sadness: 0
    }

    $scope.sentiments = {
        anger: 0,
        disgust: 0,
        fear: 0,
        joy: 0,
        sadness: 0
    }

    $scope.commits_per_sentiment = {
      anger: [],
      disgust: [],
      fear: [],
      joy: [],
      sadness: []
    }

    $scope.analyzeLink = function() {
        $scope.sentiment_counter = {
            anger: 0,
            disgust: 0,
            fear: 0,
            joy: 0,
            sadness: 0
        }
        $scope.sentiments = {
            anger: 0,
            disgust: 0,
            fear: 0,
            joy: 0,
            sadness: 0
        }
        $scope.commits_per_sentiment = {
          anger: [],
          disgust: [],
          fear: [],
          joy: [],
          sadness: []
        }
        var link = $scope.inputData.url;
        var elem = link.split("/");
        var owner = elem[elem.length-2];
        var repo = elem[elem.length-1];

        $scope.valid_commits = 0;

        githubService.getCommits(owner, repo).then(function(commits) {
            commits = commits.data;
            for (var i = 0; i < commits.length; ++i) {
                alchemyService.getSentiment(commits[i].commit.message).then(function(sentiment) {
                    var status = sentiment.data.status;
                    if (status != "ERROR") {
                      var emotions = sentiment.data.docEmotions;
                      $scope.sentiment_counter['anger'] += parseFloat(emotions['anger'])*100;
                      $scope.sentiment_counter['joy'] += parseFloat(emotions['joy'])*100;
                      $scope.sentiment_counter['fear'] += parseFloat(emotions['fear'])*100;
                      $scope.sentiment_counter['sadness'] += parseFloat(emotions['sadness'])*100;
                      $scope.sentiment_counter['disgust'] += parseFloat(emotions['disgust'])*100;
                      $scope.valid_commits += 1;

                      if (parseFloat(emotions['anger']) >= 0.6) $scope.commits_per_sentiment['anger'].push(sentiment.data.text);
                      if (parseFloat(emotions['joy']) >= 0.6) $scope.commits_per_sentiment['joy'].push(sentiment.data.text);
                      if (parseFloat(emotions['fear']) >= 0.6) $scope.commits_per_sentiment['fear'].push(sentiment.data.text);
                      if (parseFloat(emotions['sadness']) >= 0.6) $scope.commits_per_sentiment['sadness'].push(sentiment.data.text);
                      if (parseFloat(emotions['disgust']) >= 0.6) $scope.commits_per_sentiment['disgust'].push(sentiment.data.text);

                      $scope.sentiments.anger = $scope.sentiment_counter['anger'] / $scope.valid_commits;
                      $scope.sentiments.disgust = $scope.sentiment_counter['disgust'] / $scope.valid_commits;
                      $scope.sentiments.fear = $scope.sentiment_counter['fear'] / $scope.valid_commits;
                      $scope.sentiments.joy = $scope.sentiment_counter['joy'] / $scope.valid_commits;
                      $scope.sentiments.sadness = $scope.sentiment_counter['sadness'] / $scope.valid_commits;
                    }

                });
            }
        });
    }

}
