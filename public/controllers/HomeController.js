angular.module('feelinGit').controller('HomeController', HomeController);

function HomeController($scope, $state, githubService, alchemyService) {

    var commits = null;

    $scope.loading = false;
    $scope.filterDate = 0;
    $scope.octoName = 'original.png'

    $scope.valid_commits = 0;

    $scope.sentiment_counter = {
        anger: 0,
        disgust: 0,
        fear: 0,
        joy: 0,
        sadness: 0
    };

    $scope.sentiments = {
        anger: 0,
        disgust: 0,
        fear: 0,
        joy: 0,
        sadness: 0
    };

    $scope.commits_per_sentiment = {
      anger: [],
      disgust: [],
      fear: [],
      joy: [],
      sadness: []
  };

    $scope.languages = [];

    $scope.generalFeeling = {
        neutral: true,
        anger: false,
        disgust: false,
        fear: false,
        joy: false,
        sadness: false
    };

    $scope.analyzeLink = function() {
        $scope.filterDate = parseInt($scope.filterDate);
        $scope.loading = true;

        $scope.sentiment_counter = {
            anger: 0,
            disgust: 0,
            fear: 0,
            joy: 0,
            sadness: 0
        };
        $scope.sentiments = {
            anger: 0,
            disgust: 0,
            fear: 0,
            joy: 0,
            sadness: 0
        };
        $scope.commits_per_sentiment = {
            anger: [],
            disgust: [],
            fear: [],
            joy: [],
            sadness: []
        };
        $scope.languages = [];

        var link = $scope.inputData.url;
        var elem = link.split("/");
        var owner = elem[elem.length-2];
        var repo = elem[elem.length-1];

        $scope.valid_commits = 0;

        githubService.getCommits(owner, repo).then(function(commits) {
            commits = commits.data;
            for (var i = 0; i < commits.length; ++i) {
                var commitDate = commits[i].commit.author.date;
                var momentDate = moment(commitDate);

                var goodCommit = true;
                if ($scope.filterDate) goodCommit = (momentDate.add(1, 'days').valueOf() > moment().valueOf());
                if (goodCommit) {

                    alchemyService.getSentiment(commits[i].commit.message, commits[i].commit.author.name).then(function(sentiment) {
                        var status = sentiment.data.status;
                        var author = sentiment.data.author;

                        if (status != "ERROR") {
                          var emotions = sentiment.data.docEmotions;
                          $scope.sentiment_counter['anger'] += parseFloat(emotions['anger'])*200;
                          $scope.sentiment_counter['joy'] += parseFloat(emotions['joy'])*200;
                          $scope.sentiment_counter['fear'] += parseFloat(emotions['fear'])*200;
                          $scope.sentiment_counter['sadness'] += parseFloat(emotions['sadness'])*200;
                          $scope.sentiment_counter['disgust'] += parseFloat(emotions['disgust'])*200;
                          $scope.valid_commits += 1;

                          if (parseFloat(emotions['anger']) >= 0.6) $scope.commits_per_sentiment['anger'].push({user: author, commit: sentiment.data.text});
                          if (parseFloat(emotions['joy']) >= 0.6) $scope.commits_per_sentiment['joy'].push({user: author, commit: sentiment.data.text});
                          if (parseFloat(emotions['fear']) >= 0.6) $scope.commits_per_sentiment['fear'].push({user: author, commit: sentiment.data.text});
                          if (parseFloat(emotions['sadness']) >= 0.6) $scope.commits_per_sentiment['sadness'].push({user: author, commit: sentiment.data.text});
                          if (parseFloat(emotions['disgust']) >= 0.6) $scope.commits_per_sentiment['disgust'].push({user: author, commit: sentiment.data.text});

                          $scope.sentiments.anger = $scope.sentiment_counter['anger'] / $scope.valid_commits;
                          $scope.sentiments.disgust = $scope.sentiment_counter['disgust'] / $scope.valid_commits;
                          $scope.sentiments.fear = $scope.sentiment_counter['fear'] / $scope.valid_commits;
                          $scope.sentiments.joy = $scope.sentiment_counter['joy'] / $scope.valid_commits;
                          $scope.sentiments.sadness = $scope.sentiment_counter['sadness'] / $scope.valid_commits;

                          var maxFeeling = 'anger';
                          var maxNumber = $scope.sentiment_counter['anger'];

                          for (var key in $scope.sentiment_counter) {
                              if ($scope.sentiment_counter.hasOwnProperty(key)) {
                                  if ($scope.sentiment_counter[key] > maxNumber) {
                                      maxNumber = $scope.sentiment_counter[key];
                                      maxFeeling = key;
                                  }
                              }
                          }

                          switch (maxFeeling) {
                              case 'anger':
                              $scope.octoName = 'luchadortocat.png';
                              break;
                              case 'disgust':
                              $scope.octoName = 'steroidtocat.png';
                              break;
                              case 'fear':
                              $scope.octoName = 'grim-repo.jpg';
                              break;
                              case 'joy':
                              $scope.octoName = 'nyantocat.gif';
                              break;
                              case 'sadness':
                              $scope.octoName = 'deckfailcat.png';
                              break;
                              default:
                              break;
                          }

                        }

                    });
                }
            }
            $scope.loading = false;
        });

        githubService.getLanguages(owner, repo).then(function(languages) {
            $scope.valid_commits = true;
            var totalLines = 0;
            for (key in languages.data){
                var aux = {
                    language: key,
                    lines: languages.data[key]
                };
                $scope.languages.push(aux);
                totalLines += languages.data[key];
            }

            for (var i = 0; i < $scope.languages.length; ++i) {
                $scope.languages[i].percent = ($scope.languages[i].lines/totalLines)*100;
            }
        });
    }

}
