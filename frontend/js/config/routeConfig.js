angular.module('listaTelefonica').config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider.when('/contatos', {
    templateUrl: 'view/contatos.html',
    controller: 'listaTelefonicaCtrl'
  });
});
