(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReportsController', ReportsController);

    ReportsController.$inject = ['UserService', '$rootScope'];
    function ReportsController(UserService, $rootScope) {
        
    var vm = this;
    vm.billList = [];    
        
    }

})();        