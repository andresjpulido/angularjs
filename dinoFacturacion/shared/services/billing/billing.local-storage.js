(function () {
    'use strict';

    angular
        .module('app')
        .factory('BillingService', BillingService);

    BillingService.$inject = ['$timeout', '$filter', '$q'];
    function BillingService($timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer(); 
            deferred.resolve(getBills());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getBills(), { id: id });
            var bill = filtered.length ? filtered[0] : null;
            deferred.resolve(bill);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function Create(bill) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                var bills = getBills();

                // assign id
                var lastBill = bills[bills.length - 1] || { id: 0 };
                bill.id = lastBill.id + 1;

                // save to local storage
                bills.push(bill);
                setBills(bills);

                deferred.resolve({ success: true });
                deferred.resolve({ success: false, message: 'Username "' + null + '" is already taken' });
                /*
                GetByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var bills = getBills();

                            // assign id
                            var lastBill = bills[bills.length - 1] || { id: 0 };
                            bill.id = lastBill.id + 1;

                            // save to local storage
                            bills.push(bill);
                            setBillss(bills);

                            deferred.resolve({ success: true });
                        }
                    });
                    */
            }, 1000);

            return deferred.promise;
        }

        function Update(bill) {
            var deferred = $q.defer();

            var bills = getBills();
            for (var i = 0; i < bills.length; i++) {
                if (bills[i].id === bill.id) {
                    bills[i] = bill;
                    break;
                }
            }
            setBills(bills);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var bills = getBills();
            for (var i = 0; i < bills.length; i++) {
                var bill = bills[i];
                if (bill.id === id) {
                    bills.splice(i, 1);
                    break;
                }
            }
            setBills(bills);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getBills() {
            if(!localStorage.bills){
                localStorage.bills = JSON.stringify([]);
            }

            return JSON.parse(localStorage.bills);
        }

        function setBills(bills) {
            localStorage.bills = JSON.stringify(bills);
        }
    }
})();