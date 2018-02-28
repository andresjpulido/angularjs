(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'angular-barcode'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'components/home/views/home.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'components/login/views/login.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'components/register/views/register.html',
                controllerAs: 'vm'
            })

            .when('/billing', {
                controller: 'BillingController',
                templateUrl: 'components/billing/views/billing.html',
                controllerAs: 'vm'
            })
        
            .when('/bill', {
                controller: 'BillsController',
                templateUrl: 'components/billing/views/bill.html',
                controllerAs: 'vm'
            })
 
            .when('/reports', {
                controller: 'ReportsController',
                templateUrl: 'components/reports/views/reports.html',
                controllerAs: 'vm'
            })
        
            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();