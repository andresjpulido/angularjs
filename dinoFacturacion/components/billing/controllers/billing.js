(function () {
    'use strict';

    angular
        .module('app')
        .controller('BillingController', BillingController);

    BillingController.$inject = ['BillingService', '$rootScope', 'FlashService'];
    
    function BillingController(BillingService, $rootScope, FlashService) {
        var vm = this;

        vm.billing = billing;

        function billing() {
            vm.dataLoading = true;
            vm.bill.creationDate = new Date();
            vm.bill.barcode = guid();
            vm.bill.event = {}
            vm.bill.event.title = "Parque de dinosaurios"
            vm.bill.seller = {}
            vm.bill.seller.username = $rootScope.globals.currentUser.username;
            vm.bill.seller.id = "w2"
            
            vm.find = find;    
            vm.billList = []; 
            
            $rootScope.gui = vm.bill.barcode
            $rootScope.opciones = {
              format: 'CODE128',
              lineColor: '#000000',
              width: 2,
              height: 90,
              displayValue: true,
              fontOptions: '',
              font: 'monospace',
              textAlign: 'center',
              textPosition: 'bottom',
              textMargin: 2,
              fontSize: 18,
              background: '#ffffff',
              margin: 0,
              marginTop: undefined,
              marginBottom: undefined,
              marginLeft: 0,
              marginRight: undefined,
              valid: function(valid) {}
            };
            
            console.log(vm.bill)
            BillingService.Create(vm.bill)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Factura creada exitosamente! ', true);
                        //$location.path('/login');
                        vm.dataLoading = false;
                        
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
            });
        }
        
        function find(){
            BillingService.GetAll()
                .then(function (response) {
                    if (response.success) {
                        console.log(">>>> " + response)
                        FlashService.Success('Factura creada exitosamente! ', true);
                        //$location.path('/login');
                        vm.dataLoading = false;
                        vm.billList = response;
                        console.log("buscando facturas ...")
                        
                    } else {
                        console.log(">>>> >>>>" + response)
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
            });
        }
        
        $rootScope.onprint = function () { 
            console.log("impriendo ...")
            window.print();
        }    

        
    }

})();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

