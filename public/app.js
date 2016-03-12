angular.module('feelinGit',['ui.router', 'ngMessages', 'ngSanitize'])
    .config(Config);

function Config($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('feelings', {
            url: '/feelings',
            templateUrl: 'templates/feelings.html',
            controller: 'FeelingsController'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        });

    $urlRouterProvider.otherwise('/home');

}
