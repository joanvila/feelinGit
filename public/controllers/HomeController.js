angular.module('feelinGit').controller('HomeController', HomeController);

function HomeController($scope, $state, githubService, alchemyService) {

    var commits = null;

    githubService.getCommits().then(function(commits) {
        var commits = commits.data;
        for (var i = 0; i < commits.length; ++i) {
            alchemyService.getSentiment(commits[i].commit.message).then(function(sentiment) {
                commits[i].commit.sentiment = sentiment.data;
            });
        }
    });

    $scope.commits = commits;

    $scope.analyzeLink = function() {
        var link = $scope.inputData.url;
        var elem = link.split("/");
        var owner = elem[elem.length-2];
        var repo = elem[elem.length-1];
        githubService.getCommits(owner, repo);
        
    }

}
