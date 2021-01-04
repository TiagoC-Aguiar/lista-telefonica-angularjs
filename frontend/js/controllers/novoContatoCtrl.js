/* eslint-disable prefer-arrow-callback */
angular.module('listaTelefonica').controller('novoContatoCtrl', function ($scope, contatosAPI, serialGenerator, $location) {

  $scope.adicionarContato = function (contato) {
    contato.serial = serialGenerator.generate();
    contatosAPI.saveContato(contato).then(function (response) {
      delete $scope.contato;
      $scope.contatoForm.$setPristine();      
      $location.path('/contatos');
    });
  };
});
