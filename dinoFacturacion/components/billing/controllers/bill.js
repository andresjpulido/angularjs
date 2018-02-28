(function () {
    'use strict';

    angular
        .module('app')
        .controller('BillsController', BillsController);

    BillsController.$inject = ['BillingService', 'FlashService', 'UserService', '$rootScope'];
    
    function BillsController(BillingService, FlashService, UserService, $rootScope) {
        
        var vm = this;
        vm.find = find;    
        $rootScope.billList = [];    
       
        function find(){
            console.log("cargando el archivo de BillsController ... ");
            BillingService.GetAll()
                .then(function (response) {
                     
                    if (response) {
                        FlashService.Success('Factura creada exitosamente! ', true);
                        //$location.path('/login');
                        vm.dataLoading = false;
                        console.log(response);
                        $rootScope.billList = response;
                        console.log("buscando facturas ...")
                        
                    } else {
                        console.log(response.message)
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
            });
        }
 
    }
    
})();