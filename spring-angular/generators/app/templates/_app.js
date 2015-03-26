var appModule = angular.module('myApp', []); 

appModule.controller('MainCtrl', ['mainService','$scope', function(mainService, $scope) {
            $scope.greeting = mainService.getGreeting();
}]);

appModule.service('mainService', function($http) {
    return {
        login : getGreeting() {
            return 'Hello World!';
        },
    };
});