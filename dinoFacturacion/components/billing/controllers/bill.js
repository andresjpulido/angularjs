(function () {
    'use strict';

    angular
        .module('app')
        .controller('BillsController', BillsController);

    BillsController.$inject = ['BillingService', 'FlashService', 'UserService', '$rootScope', '$q'];
    
    function BillsController(BillingService, FlashService, UserService, $rootScope,$q) {
        
        var vm = this;
        vm.find = find;    
        $rootScope.billList = [];    
       var deferred = $q.defer();
        
        function find(){
            console.log("cargando el archivo de BillsController ... ");
            BillingService.GetAll()
                .then(function (response) {
                     
                    if (response) {
                        FlashService.Success('Factura creada exitosamente! ', true);
                        //$location.path('/login');
                        vm.dataLoading = false;
                        console.log(response);
                        response = [{
      a: 1,
      b: 2
    }, {
      a: 3,
      b: 4
    }, {
      a: 5,
      b: 6
    }];
                        $rootScope.billList = response;
                        deferred.resolve(response);
                        console.log("buscando facturas ...")
                        
                    } else {
                        console.log(response.message)
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
            });
        }
 
        
        $rootScope.getDataHeader = function(){
            var result = ["Evento","Punto de venta","Codigo barras", "Punto de venta", "Localidad", "Ciudad", "Asesor", "Nombre cliente", "Apellido cliente", "Identificacion", "Correo","Fecha"];
            
            BillingService.GetAll()
                .then(function (response) {
                     
                    if (response) {
                        FlashService.Success('Reporte creado satisfactoriamente! ', true);
                        //$location.path('/login');
                        vm.dataLoading = false;
                        console.log(response);
                        
                        for(var i=0; i < response.length; i++){
                            $rootScope.billList.push(
                                {
                                    "a":response[i].eventId,
                                    "b":response[i].pointSaleId,
                                    "c":response[i].barcode,
                                    "d":response[i].pointSaleId,
                                    "e":response[i].locationId,
                                    "f":response[i].cityId,
                                    "g":response[i].seller.username,
                                    "h":response[i].client.firstName,
                                    "i":response[i].client.lastName,
                                    "j":response[i].client.identification,
                                    "k":response[i].client.email,
                                    "l":response[i].creationDate,
                                })
                        }
 
                        $rootScope.billList = response;
                        deferred.resolve(response);
                        console.log("buscando facturas ..." + response) //result.concat($rootScope.billList.barcode,$rootScope.billList.cityId,$rootScope.billList.client.firstName))
                        //result = $rootScope.billList
                         
                    } else {
                        console.log(response.message)
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
            });
            
            return result;
        }
        
    }
    
})();