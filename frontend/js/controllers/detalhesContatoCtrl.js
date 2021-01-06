/* eslint-disable prefer-arrow-callback */
angular.module('listaTelefonica').controller('detalhesContatoCtrl', function ($scope, contato) {
  $scope.contato = contato.data;
});
