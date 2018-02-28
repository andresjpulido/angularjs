(function () {
    'use strict';

    angular
        .module('app')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$location', 'UserService', '$rootScope'];
    
    function NavbarController($location,UserService, $rootScope) {
        var vm = this;
        // vm.updatenav = updatenav;
        $rootScope.username = $rootScope.globals.currentUser.username;
        
        console.log("vm.username " + $rootScope.username);
        
        $rootScope.navNodes = [{id: 1, title: "Facturacion", selected: false, path: "billing"},
                               {id: 2, title: "Historial", selected: false, path: "bill"},
                               {id: 3, title: "Reportes", selected: false, path: "reports"}];
        
        $rootScope.cosa = function (id) { 
            for(var i=0; i<$rootScope.navNodes.length; i++){
                $rootScope.navNodes[i].selected = false;
                if($rootScope.navNodes[i].id == id){
                    $rootScope.navNodes[i].selected = true;
                    $location.path('/'+$rootScope.navNodes[i].path);
                }
            } 
        }
        

        
    }

})();