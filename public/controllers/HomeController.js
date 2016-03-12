angular.module('feelinGit').controller('HomeController', HomeController);

function HomeController($scope, $state, githubService, alchemyService) {

    var commits = null;

    $scope.analyzeLink = function() {
        var link = $scope.inputData.url;
        var elem = link.split("/");
        var owner = elem[elem.length-2];
        var repo = elem[elem.length-1];

        var commits = null;
        $scope.sentiments = [];

        githubService.getCommits(owner, repo).then(function(commits) {
            commits = commits.data;
            for (var i = 0; i < commits.length; ++i) {
                alchemyService.getSentiment(commits[i].commit.message).then(function(sentiment) {
                    console.log(sentiment);
                    $scope.sentiments.push(sentiment.data.document_tone.tone_categories[0].tones);
                });
            }
        });

    }

}
