/// <reference path="../Scripts/angular.js" />

(function () {
    'use strict';

    var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngAnimate']);

    myApp.config(["$routeProvider",
    function ($routeProvider) {
        $routeProvider.when("/products", {
            templateUrl: "/App/Templates/ProductsList.html",
            controller: "productsListCtrl"
        });
        $routeProvider.when("/product/:id", {
            templateUrl: "/App/Templates/ProductEditor.html",
            controller: "ProductEditorCtrl"
        });
        $routeProvider.otherwise({
            redirectTo: "/products"
        });
    }]);


    myApp.controller('productsListCtrl', ['$scope', 'Products', '$location',
        function ($scope, Products, $location) {
            $scope.products = Products.query();

            $scope.select = function (p) {
                $location.path("/product/" + p.productID);
                return false;
            };
        }]);


    myApp.controller('ProductEditorCtrl', ['$scope', 'Products', 'Suppliers', 'Categories', '$location', '$routeParams',
        function ($scope, Products, Suppliers, Categories, $location, $routeParams) {

            $scope.product = Products.get({ id: $routeParams.id });
            $scope.suppliers = Suppliers.query();
            $scope.categories = Categories.query();

            $scope.save = function () {
                $scope.product.$save(function () {
                    $location.path('/products');
                });
            };

            $scope.cancel = function () {
                $location.path('/products');
            };
        }]);


    myApp.factory('Products', ['$resource', function ($resouce) {
        return $resouce('/api/products/:id', {
            id: '@productId'
        }, {
            save: {
                method: "PUT", params: { id: '@productID' }
            }
        });
    }]);

    myApp.factory('Suppliers', ['$resource', function ($resouce) {
        return $resouce('/api/suppliers/:id');
    }]);

    myApp.factory('Categories', ['$resource', function ($resouce) {
        return $resouce('/api/categories/:id');
    }]);
}());

