angular.module('feelinGit').controller('HomeController', HomeController);

function HomeController($scope, $state, githubService) {

    githubService.getCommits().then(function(commits) {
        $scope.commits = commits.data;
    });
}
