angular.module('listaTelefonica').config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider.when('/contatos', {
    templateUrl: 'view/contatos.html',
    controller: 'listaTelefonicaCtrl',
    resolve: {
      contatos: function (contatosAPI) {
        return contatosAPI.getContatos();
      },
      operadoras: function (operadorasAPI) {
        return operadorasAPI.getOperadoras();
      }
    }
  });
  $routeProvider.when('/novocontato', {
    templateUrl: 'view/novoContato.html',
    controller: 'novoContatoCtrl',
    resolve: {
      operadoras: function (operadorasAPI) {
        return operadorasAPI.getOperadoras();
      }
    }
  });
  $routeProvider.otherwise({redirectTo: '/contatos'});
});
